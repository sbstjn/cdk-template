import { Aspects } from 'aws-cdk-lib'
import { IConstruct } from 'constructs'
import { UnifiedTags } from '../aspects/UnifiedTags'
import { Workload } from '../base/Workload'
import { ComputeStack } from '../stacks/Compute'
import { ObservabilityStack } from '../stacks/Observability'
import { StorageStack } from '../stacks/Storage'

export interface ExampleProps {
  enableObservability: boolean
}

export class Example extends Workload {
  constructor(scope: IConstruct, props: ExampleProps) {
    super(scope, 'example')

    const storage = new StorageStack(this, 'storage')
    const compute = new ComputeStack(this, 'compute')

    if (props.enableObservability) {
      const obs = new ObservabilityStack(this, 'observability')

      obs.enableS3AccessLogs(storage)
      obs.enableLambdaXRayTracing(compute)
    }

    Aspects.of(this).add(new UnifiedTags())
  }
}
