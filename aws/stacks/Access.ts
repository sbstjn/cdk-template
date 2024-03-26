import { Stack, StackProps, aws_apigatewayv2 } from 'aws-cdk-lib'
import { IConstruct } from 'constructs'

export interface AccessStackProps extends StackProps {}

export class AccessStack extends Stack {
  api = new aws_apigatewayv2.HttpApi(this, 'api')

  constructor(scope: IConstruct, id: string, props?: AccessStackProps) {
    super(scope, id, props)
  }
}
