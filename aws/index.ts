#!/usr/bin/env node

import { App } from 'aws-cdk-lib'
import { Example } from './workloads/Example'

const app = new App({
  context: {
    version: 'v1.2.3',
  },
})

new Example(app, {
  enableObservability: true,
  exportDiagram: false,
})
