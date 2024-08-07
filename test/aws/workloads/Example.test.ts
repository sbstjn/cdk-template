import { App } from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'

import { Example } from '../../../aws/workloads/Example'

describe('Stack', () => {
  let app: App
  let workload: Example
  let template: Template

  beforeAll(() => {
    app = new App({
      context: {
        version: 'v3.2.1-workload',
      },
    })

    workload = new Example(app, {
      enableObservability: true,
      exportDiagram: false,
    })
  })

  describe('Context', () => {
    it('has version context', () => {
      expect(workload.node.getContext('version')).toBe('v3.2.1-workload')
    })
  })
})
