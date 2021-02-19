import { expect as expectCDK, haveResource } from '@aws-cdk/assert'
import * as cdk from '@aws-cdk/core'

import { ExampleStack } from '../../../aws/stacks/example'

describe('Stack', () => {
  let app: cdk.App;
  let stack: cdk.Stack

  beforeAll(() => {
    app = new cdk.App()
    stack = new ExampleStack(app, 'MyTestStack')
  })

  describe('SQS Queue', () => {
    it('is created', () => {
      expectCDK(stack).to(haveResource("AWS::SQS::Queue", {
        VisibilityTimeout: 300
      }))
    })
  })

  describe('SNS Topic', () => {
    it('is created', () => {
      expectCDK(stack).to(haveResource("AWS::SNS::Topic"))
    })
  })

  describe('Lambda Function', () => {
    it('is created', () => {
      expectCDK(stack).to(haveResource("AWS::Lambda::Function"))
    })
  })
})
