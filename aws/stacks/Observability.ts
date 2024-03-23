import { Aspects, Stack, Tags, aws_s3 } from 'aws-cdk-lib'
import { IConstruct } from 'constructs'
import { EnableLambdaXRayTracing } from '../aspects/EnableLambdaXRayTracing'
import { S3BucketAccessLogs } from '../aspects/S3BucketAccessLogs'

export class ObservabilityStack extends Stack {
  bucketS3AccessLogs = new aws_s3.Bucket(this, 's3-access-logs')

  constructor(scope: IConstruct, id: string) {
    super(scope, id)

    Tags.of(this).add('custom:observability', 'true')
  }

  public enableS3AccessLogs(stack: Stack) {
    Aspects.of(stack).add(new S3BucketAccessLogs({ bucket: this.bucketS3AccessLogs }))
  }

  public enableLambdaXRayTracing(stack: Stack) {
    Aspects.of(stack).add(new EnableLambdaXRayTracing())
  }
}
