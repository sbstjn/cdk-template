import { IAspect, aws_s3 } from 'aws-cdk-lib'
import { IConstruct } from 'constructs'

export interface S3BucketAccessLogsProps {
  bucket: aws_s3.IBucket
}

export class S3BucketAccessLogs implements IAspect {
  constructor(private props: S3BucketAccessLogsProps) {}

  public visit(node: IConstruct): void {
    if (!(node instanceof aws_s3.CfnBucket)) {
      return
    }

    node.loggingConfiguration = {
      destinationBucketName: this.props.bucket.bucketName,
      logFilePrefix: `${node.node.scope!.node.id}/`,
    }
  }
}
