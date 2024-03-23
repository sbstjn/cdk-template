import { Context } from "aws-lambda"

const spySNSPublish = jest.fn()
const spySNS = jest.fn(() => ({ publish: spySNSPublish }))

jest.mock('aws-sdk', () => ({
  SNS: spySNS
}))

import { handler } from '../../../src/functions/publish'

describe('Publish', () => {
  beforeAll(() => {
    process.env.TOPIC_ARN = 'ExampleTopic'
  })

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('calls SNS.publish with event data', async () => {
    spySNSPublish.mockImplementation(() => ({
      promise() { return Promise.resolve() }
    }))

    await expect(
      handler({ fails: false }, {} as Context, () => { })
    ).resolves.toBeTruthy()

    expect(spySNSPublish).toHaveBeenCalledTimes(1)
    expect(spySNSPublish).toHaveBeenCalledWith({ TopicArn: "ExampleTopic", Message: "{\"fails\":false}" })
  })

  it('throws exception', async () => {
    await expect(
      handler({ fails: true }, {} as Context, () => { })
    ).rejects.toThrow('Failed on purpose')

    expect(spySNSPublish).toBeCalledTimes(0)
  })
})
