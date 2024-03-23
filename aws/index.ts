#!/usr/bin/env node

import { App, Aspects } from 'aws-cdk-lib';
import { UnifiedTags } from './aspects/UnifiedTags';
import { Example } from './workloads/Example';

const app = new App({
  context: {
    version: 'v1.2.3',
  },
})

Aspects.of(app).add(new UnifiedTags())

new Example(app, {
  enableObservability: false,
})
