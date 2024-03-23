import {
  Duration,
  Stack,
  StackProps,
  aws_iam,
  aws_kms,
  aws_lambda_nodejs,
  aws_sns,
  aws_sns_subscriptions,
  aws_sqs,
} from 'aws-cdk-lib'
import { IConstruct } from 'constructs'

export interface ComputeStackProps extends StackProps {}

export class ComputeStack extends Stack {
  key = new aws_kms.Key(this, 'key', {
    alias: 'compute/key',
  })

  queue = new aws_sqs.Queue(this, 'queue', {
    visibilityTimeout: Duration.seconds(300),
    encryption: aws_sqs.QueueEncryption.KMS,
    dataKeyReuse: Duration.minutes(5),
    encryptionMasterKey: this.key,
  })

  topic = new aws_sns.Topic(this, 'topic', {
    masterKey: this.key,
  })

  process = new aws_lambda_nodejs.NodejsFunction(this, 'process', {
    entry: 'src/functions/process.ts',
    environment: {
      TOPIC_ARN: this.topic.topicArn,
    },
  })

  constructor(scope: IConstruct, id: string, props?: ComputeStackProps) {
    super(scope, id, props)

    this.topic.addSubscription(
      new aws_sns_subscriptions.SqsSubscription(this.queue, {
        rawMessageDelivery: true,
      }),
    )

    this.key.addToResourcePolicy(
      new aws_iam.PolicyStatement({
        sid: 'allow-sns',
        effect: aws_iam.Effect.ALLOW,
        resources: ['*'],
        principals: [new aws_iam.ServicePrincipal('sns'), this.process.role!],
        actions: ['kms:Decrypt', 'kms:GenerateDataKey'],
      }),
    )

    this.topic.grantPublish(this.process)
  }
}
