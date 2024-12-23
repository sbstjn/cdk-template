import { Handler } from 'aws-lambda'
import { SNS } from 'aws-sdk'

const sns = new SNS({ apiVersion: '2010-03-31' })

export interface HandlerEvent {
  fails: boolean
}

export const handler: Handler<HandlerEvent, boolean> = async event => {
  if (event.fails) {
    throw new Error('Failed on purpose')
  }

  await sns
    .publish({
      TopicArn: process.env.TOPIC_ARN,
      Message: JSON.stringify(event),
    })
    .promise()

  return true
}
