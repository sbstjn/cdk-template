import { Stack } from 'aws-cdk-lib'
import { Construct, IConstruct } from 'constructs'

export class Workload extends Construct {
  stacks: Stack[]

  constructor(scope: IConstruct, id: string) {
    super(scope, id)

    this.node.setContext('workload', id)
  }

  addStack(node: Stack) {
    this.stacks.push(node)
  }
}
