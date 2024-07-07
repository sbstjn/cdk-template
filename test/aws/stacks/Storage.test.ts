import { App, Stack } from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'

import { StorageStack } from '../../../aws/stacks/Storage'

describe('Stack', () => {
  let app: App
  let stack: Stack
  let template: Template

  beforeAll(() => {
    app = new App({
      context: {
        version: 'v3.2.1-storage',
      },
    })

    stack = new StorageStack(app, 'storage')
    template = Template.fromStack(stack)
  })

  describe('Template', () => {
    it('match snapshot', () => {
      expect(template.toJSON()).toMatchSnapshot()
    })
  })

  describe('S3 Bucket', () => {
    it('is created', () => {
      template.hasResource('AWS::S3::Bucket', {})
    })
  })
})
