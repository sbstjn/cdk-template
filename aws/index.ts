#!/usr/bin/env node

import { App } from 'aws-cdk-lib'
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
 * Configure Workloads
 */

new Example(app, {
  enableObservability: true,
})
