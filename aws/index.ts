#!/usr/bin/env node

import { App, Aspects } from 'aws-cdk-lib'
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag'
import { UnifiedTags } from './aspects/UnifiedTags'
import { Example } from './workloads/Example'

/**
 * Configure CDK App
 */

const app = new App({
  context: {
    version: 'v1.2.3',
  },
})

/**
 * Configure Aspects
 */

Aspects.of(app).add(new UnifiedTags())
Aspects.of(app).add(new AwsSolutionsChecks())

NagSuppressions.addResourceSuppressions(
  app,
  [
    {
      id: 'AwsSolutions-IAM4',
      reason: 'Allow usage of AWSLambdaBasicExecutionRole',
      appliesTo: ['Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'],
    },
    {
      id: 'AwsSolutions-SQS3',
      reason: 'Allow usage of SQS without DLQ',
    },
    {
      id: 'AwsSolutions-S1',
      reason: 'Allow usage of S3 without server access logs',
    },
  ],
  true,
)

/**
 * Configure Workloads
 */

new Example(app, {
  enableObservability: false,
})
