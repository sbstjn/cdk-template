#!/usr/bin/env node

import { App } from './base/App'
import { AppStage } from './config'
import { Components } from './stacks/Components'

const app = new App({
  name: 'example',
  stage: AppStage.DEVELOPMENT,
})

app.add(Components)
