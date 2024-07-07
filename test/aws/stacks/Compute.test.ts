import { App, Stack } from 'aws-cdk-lib'
import { Template } from 'aws-cdk-lib/assertions'

import { ComputeStack } from '../../../aws/stacks/Compute'

describe('Stack', () => {
  let app: App
  let stack: Stack
  let template: Template

  beforeAll(() => {
    app = new App({
      context: {
        version: 'v3.2.1-compute',
      },
    })

    stack = new ComputeStack(app, 'compute')
    template = Template.fromStack(stack)
  })

  describe('Template', () => {
    it('match snapshot', () => {
      expect(template.toJSON()).toMatchSnapshot()
    })
  })

  describe('SQS Queue', () => {
    it('is created', () => {
      template.hasResource('AWS::SQS::Queue', {
        Properties: {
          VisibilityTimeout: 300,
        },
      })
    })
  })

  describe('SNS Topic', () => {
    it('is created', () => {
      template.hasResource('AWS::SNS::Topic', {})
    })
  })

  describe('Lambda Function', () => {
    it('is created', () => {
      template.hasResource('AWS::Lambda::Function', {})
    })
  })
})
