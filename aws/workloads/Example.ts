import { IConstruct } from 'constructs'
import { Workload } from '../base/Workload'
import { ComputeStack } from '../stacks/Compute'
import { StorageStack } from '../stacks/Storage'

export interface ExampleProps {
  enableObservability: boolean
}

export class Example extends Workload {
  constructor(scope: IConstruct, props?: ExampleProps) {
    super(scope, 'example')

    new StorageStack(this, 'storage')
    new ComputeStack(this, 'compute')
  }
}
