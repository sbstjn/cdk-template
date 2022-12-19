import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'

export interface StackProps extends cdk.StackProps {}

export class Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    const account = scope.node.tryGetContext('account')
    const region = scope.node.tryGetContext('region')

    super(scope, id, {
      ...props,
      env: props?.env || {
        account: account || undefined,
        region: region || undefined,
      },
    })
  }
}
