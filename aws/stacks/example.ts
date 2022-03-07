import { App, Duration, Stack, StackProps } from 'aws-cdk-lib'
import {
  aws_sns as sns,
  aws_sns_subscriptions as subs,
  aws_lambda_nodejs as lambda,
  aws_sqs as sqs,
  aws_iam as iam,
  aws_kms as kms,
} from 'aws-cdk-lib'

export class ExampleStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props)

    const key = new kms.Key(this, 'YourKey')
    const keyAlias = key.addAlias('your/alias')

    const queue = new sqs.Queue(this, 'YourQueue', {
      visibilityTimeout: Duration.seconds(300),
      encryption: sqs.QueueEncryption.KMS,
      dataKeyReuse: Duration.minutes(5),
      encryptionMasterKey: keyAlias,
    })

    const topic = new sns.Topic(this, 'YourTopic', {
      masterKey: keyAlias,
    })

    topic.addSubscription(
      new subs.SqsSubscription(queue, {
        rawMessageDelivery: true,
      }),
    )

    const func = new lambda.NodejsFunction(this, 'YourLambda', {
      entry: 'src/example/handler.ts',
      handler: 'run',
      environment: {
        TOPIC_ARN: topic.topicArn,
      },
    })

    keyAlias.addToResourcePolicy(
      new iam.PolicyStatement({
        sid: 'sns-allow',
        effect: iam.Effect.ALLOW,
        resources: ['*'],
        principals: [new iam.ServicePrincipal('sns'), func.role!],
        actions: ['kms:Decrypt', 'kms:GenerateDataKey'],
      }),
    )

    topic.grantPublish(func)
  }
}
