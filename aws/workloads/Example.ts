import { App } from 'aws-cdk-lib'
import { Construct, IConstruct } from 'constructs'

import { AccessStack } from '../stacks/Access'
import { ComputeStack } from '../stacks/Compute'
import { ObservabilityStack } from '../stacks/Observability'
import { StorageStack } from '../stacks/Storage'
import { captureArchitecture } from '../util'

export interface ExampleProps {
  enableObservability: boolean
  exportDiagram: boolean
}

export class Example extends Construct {
  constructor(scope: IConstruct, props: ExampleProps) {
    super(scope, 'example')

    const storage = new StorageStack(this, 'storage')
    const compute = new ComputeStack(this, 'compute')
    const access = new AccessStack(this, 'access')

    if (props.enableObservability) {
      new ObservabilityStack(this, 'observability', {
        cover: [storage, compute, access],
      })
    }

    if (props.exportDiagram) {
      Promise.resolve(captureArchitecture(App.of(this)!))
    }
  }
}
