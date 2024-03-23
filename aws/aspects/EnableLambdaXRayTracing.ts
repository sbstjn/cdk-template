import { IAspect, aws_lambda } from 'aws-cdk-lib'
import { IConstruct } from 'constructs'

export class EnableLambdaXRayTracing implements IAspect {
  public visit(node: IConstruct): void {
    if (node instanceof aws_lambda.CfnFunction) {
      node.addOverride('Properties.TracingConfig.Mode', 'Active')
    }
  }
}
