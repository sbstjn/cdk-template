import { Stack, StackProps } from 'aws-cdk-lib'
import { IConstruct } from 'constructs'

export interface ObservabilityStackProps extends StackProps {}

export class ObservabilityStack extends Stack {
  constructor(scope: IConstruct, id: string, props?: ObservabilityStackProps) {
    super(scope, id, props)
  }
}
