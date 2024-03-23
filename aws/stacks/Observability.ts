import { Aspects, Stack, aws_s3 } from 'aws-cdk-lib'
import { Construct, IConstruct } from 'constructs'
import { EnableLambdaXRayTracing } from '../aspects/EnableLambdaXRayTracing'
import { S3BucketAccessLogs } from '../aspects/S3BucketAccessLogs'

export interface ObservabilityStackProps {
  cover: IConstruct[]
}

export class ObservabilityStack extends Stack {
  bucketS3AccessLogs = new aws_s3.Bucket(this, 's3-access-logs')

  constructor(scope: IConstruct, id: string, props: ObservabilityStackProps) {
    super(scope, id)

    props.cover.forEach(node => {
      this.enableS3AccessLogs(node)
      this.enableLambdaXRayTracing(node)
    })
  }

  public enableS3AccessLogs(node: Construct) {
    Aspects.of(node).add(new S3BucketAccessLogs({ bucket: this.bucketS3AccessLogs }))
  }

  public enableLambdaXRayTracing(node: Construct) {
    Aspects.of(node).add(new EnableLambdaXRayTracing())
  }
}
