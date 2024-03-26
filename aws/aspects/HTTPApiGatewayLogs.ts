import { IAspect, aws_apigatewayv2, aws_iam, aws_logs } from 'aws-cdk-lib'
import { RetentionDays } from 'aws-cdk-lib/aws-logs'
import { Construct, IConstruct } from 'constructs'

export class HTTPApiGatewayLogs implements IAspect {
  constructor() {}

  public visit(node: IConstruct): void {
    if (!(node instanceof aws_apigatewayv2.CfnStage)) {
      return
    }

    const scope = new Construct(node.node.scope!, 'logs')

    const group = new aws_logs.LogGroup(scope, `group`, {
      logGroupName: `/${node.node.scope!}`,
      retention: RetentionDays.ONE_WEEK,
    })

    const role = new aws_iam.Role(scope, `role`, {
      assumedBy: new aws_iam.ServicePrincipal('apigateway.amazonaws.com'),
    })

    const policy = new aws_iam.PolicyStatement({
      actions: [
        'logs:CreateLogGroup',
        'logs:CreateLogStream',
        'logs:DescribeLogGroups',
        'logs:DescribeLogStreams',
        'logs:PutLogEvents',
        'logs:GetLogEvents',
        'logs:FilterLogEvents',
      ],
      resources: ['*'],
    })

    role.addToPolicy(policy)
    group.grantWrite(role)

    node.accessLogSettings = {
      destinationArn: group.logGroupArn,
      format: JSON.stringify({
        requestId: '$context.requestId',
        requestTime: '$context.requestTime',
        requestTimeEpoch: '$context.requestTimeEpoch',
        userAgent: '$context.identity.userAgent',
        httpMethod: '$context.httpMethod',
        domainName: '$context.domainName',
        status: '$context.status',
        path: '$context.path',
      }),
    }
  }
}
