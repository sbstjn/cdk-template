import { Construct, IConstruct } from 'constructs'
import { ComputeStack } from '../stacks/Compute'
import { ObservabilityStack } from '../stacks/Observability'
import { StorageStack } from '../stacks/Storage'

export interface ExampleProps {
  enableObservability: boolean
}

export class Example extends Construct {
  constructor(scope: IConstruct, props: ExampleProps) {
    super(scope, 'example')

    const storage = new StorageStack(this, 'storage')
    const compute = new ComputeStack(this, 'compute')

    if (props.enableObservability) {
      new ObservabilityStack(this, 'observability', {
        cover: [storage, compute],
      })
    }
  }
}
