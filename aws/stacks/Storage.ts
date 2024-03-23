import { Stack, StackProps, aws_kms, aws_s3 } from 'aws-cdk-lib'
import { IConstruct } from 'constructs'

export interface StorageStackProps extends StackProps {}

export class StorageStack extends Stack {
  key = new aws_kms.Key(this, 'key', {
    alias: 'storage/key',
    enableKeyRotation: true,
  })

  constructor(scope: IConstruct, id: string, props?: StorageStackProps) {
    super(scope, id, props)

    new aws_s3.Bucket(this, 'bucket-one', {
      bucketKeyEnabled: true,
      encryptionKey: this.key,
      enforceSSL: true,
    })

    new aws_s3.Bucket(this, 'bucket-two', {
      bucketKeyEnabled: true,
      encryptionKey: this.key,
      enforceSSL: true,
    })
  }
}
