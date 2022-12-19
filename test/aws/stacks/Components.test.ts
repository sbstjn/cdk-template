import { Template } from 'aws-cdk-lib/assertions'
import { App } from '../../../aws/base/App'
import { AppStage } from '../../../aws/config'

import { Components } from '../../../aws/stacks/Components'

describe('Stack', () => {
  let app: App
  let stack: Components
  let template: Template

  beforeAll(() => {
    app = new App({
      name: 'testing',
      stage: AppStage.TESTING,
    })

    stack = new Components(app, 'MyTestStack')
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
