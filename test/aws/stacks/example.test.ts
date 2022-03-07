import { Template } from 'aws-cdk-lib/assertions'
import { App } from 'aws-cdk-lib'

import { ExampleStack } from '../../../aws/stacks/example'

describe('Stack', () => {
  let app: App
  let stack: ExampleStack
  let template: Template

  beforeAll(() => {
    app = new App()
    stack = new ExampleStack(app, 'MyTestStack')
    template = Template.fromStack(stack)
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
