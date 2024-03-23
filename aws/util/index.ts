import { CdkGraph } from '@aws/pdk/cdk-graph'
import { CdkGraphDiagramPlugin } from '@aws/pdk/cdk-graph-plugin-diagram'
import { Stage } from 'aws-cdk-lib'

export const captureArchitecture = async (app: Stage) => {
  const g = new CdkGraph(app, {
    plugins: [new CdkGraphDiagramPlugin()],
  })

  app.synth()
  await g.report()
}
