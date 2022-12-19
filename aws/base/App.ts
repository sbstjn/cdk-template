import * as cdk from 'aws-cdk-lib'
import { AppStage } from '../config'
import { Stack, StackProps } from './Stack'

export interface AppProps {
  name: string
  stage: AppStage
  environment?: string
}

export class App extends cdk.App {
  protected name: string
  protected stage: AppStage
  protected environment?: string

  constructor(props: AppProps) {
    super()

    this.name = props.name
    this.stage = props.stage
    this.environment = props.environment
  }

  get prefix() {
    let name = `${this.name}-${this.stage}`

    if (this.environment) {
      name = `${name}-${this.environment}`
    }

    return name
  }

  add(component: typeof Stack, props?: StackProps) {
    new component(this, component.name, {
      stackName: `${this.prefix}-${component.name}`,
      ...props,
    })
  }
}
