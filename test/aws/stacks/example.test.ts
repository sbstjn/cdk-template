import '@aws-cdk/assert/jest'
import * as cdk from '@aws-cdk/core'

import { ExampleStack } from '../../../aws/stacks/example'

describe('Stack', () => {
  let app: cdk.App
  let stack: ExampleStack

  beforeAll(() => {
    app = new cdk.App()
    stack = new ExampleStack(app, 'MyTestStack')
  })

  describe('SQS Queue', () => {
    it('is created', () => {
      expect(stack).toHaveResource("AWS::SQS::Queue", {
        VisibilityTimeout: 300
      })
    })
  })

  describe('SNS Topic', () => {
    it('is created', () => {
      expect(stack).toHaveResource("AWS::SNS::Topic")
    })
  })

  describe('Lambda Function', () => {
    it('is created', () => {
      expect(stack).toHaveResource("AWS::Lambda::Function")
    })
  })
})
