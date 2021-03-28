import * as sns from '@aws-cdk/aws-sns'
import * as subs from '@aws-cdk/aws-sns-subscriptions'
import * as lambda from '@aws-cdk/aws-lambda-nodejs'
import * as sqs from '@aws-cdk/aws-sqs'
import * as iam from '@aws-cdk/aws-iam'
import * as kms from '@aws-cdk/aws-kms'
import * as cdk from '@aws-cdk/core'

export class ExampleStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const key = new kms.Key(this, 'YourKey')
    const keyAlias = key.addAlias('your/alias')

    const queue = new sqs.Queue(this, 'YourQueue', {
      visibilityTimeout: cdk.Duration.seconds(300),
      encryption: sqs.QueueEncryption.KMS,
      dataKeyReuse: cdk.Duration.minutes(5),
      encryptionMasterKey: keyAlias,
    })

    const topic = new sns.Topic(this, 'YourTopic', {
      masterKey: keyAlias,
    })

    topic.addSubscription(
      new subs.SqsSubscription(queue, {
        rawMessageDelivery: true,
      })
    )

    const func = new lambda.NodejsFunction(this, "YourLambda", {
      entry: "src/example/handler.ts",
      handler: "run",
      environment: {
        TOPIC_ARN: topic.topicArn,
      },
    })

    keyAlias.addToResourcePolicy(new iam.PolicyStatement({
      sid: 'sns-allow',
      effect: iam.Effect.ALLOW,
      resources: ['*'],
      principals: [
        new iam.ServicePrincipal('sns'),
        func.role!
      ],
      actions: [
        'kms:Decrypt',
        'kms:GenerateDataKey'
      ]
    }))

    topic.grantPublish(func)
  }
}
