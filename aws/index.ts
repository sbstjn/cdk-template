#!/usr/bin/env node

import { App } from 'aws-cdk-lib'
import { ExampleStack } from './stacks/example'

const app = new App()

new ExampleStack(app, 'Example', {
  env: {
    region: 'eu-central-1',
  },
})
