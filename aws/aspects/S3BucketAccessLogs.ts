import { IAspect, aws_s3 } from 'aws-cdk-lib'
import { IBucket } from 'aws-cdk-lib/aws-s3'
import { IConstruct } from 'constructs'

export interface S3BucketAccessLogsProps {
  bucket: IBucket
}

export class S3BucketAccessLogs implements IAspect {
  constructor(private props: S3BucketAccessLogsProps) {}

  public visit(node: IConstruct): void {
    if (node instanceof aws_s3.CfnBucket) {
      node.loggingConfiguration = {
        destinationBucketName: this.props.bucket.bucketName,
        logFilePrefix: `${node.node.scope!.node.id}/`,
      }
    }
  }
}
