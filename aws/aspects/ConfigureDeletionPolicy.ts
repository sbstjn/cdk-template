import { IAspect, RemovalPolicy, aws_s3 } from 'aws-cdk-lib'
import { IConstruct } from 'constructs'

export class ConfigureDeletionPolicy implements IAspect {
  public visit(node: IConstruct): void {
    if (!(node instanceof aws_s3.CfnBucket)) {
      return
    }

    node.applyRemovalPolicy(RemovalPolicy.RETAIN)
  }
}
