import {
  Duration,
  Stack,
  StackProps,
  aws_iam,
  aws_kms,
  aws_lambda,
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
    enableKeyRotation: true,
  })

  queue = new aws_sqs.Queue(this, 'queue', {
    visibilityTimeout: Duration.seconds(300),
    encryption: aws_sqs.QueueEncryption.KMS,
    dataKeyReuse: Duration.minutes(5),
    encryptionMasterKey: this.key,
    enforceSSL: true,
  })

  topic = new aws_sns.Topic(this, 'topic', {
    masterKey: this.key,
  })

  publish = new aws_lambda_nodejs.NodejsFunction(this, 'publish', {
    entry: 'src/functions/publish.ts',
    runtime: aws_lambda.Runtime.NODEJS_20_X,
    runtimeManagementMode: aws_lambda.RuntimeManagementMode.AUTO,
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
        principals: [new aws_iam.ServicePrincipal('sns'), this.publish.role!],
        actions: ['kms:Decrypt', 'kms:GenerateDataKey'],
      }),
    )

    this.topic.grantPublish(this.publish)
  }
}
