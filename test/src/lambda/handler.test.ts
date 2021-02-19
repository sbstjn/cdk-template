import { run } from '../../../src/lambda/handler'

describe('Handler', () => {
  it('returns string value', async () => {
    await expect(
      run({fails: false})
    ).resolves.toBe("Done")
  })

  it('throws an exception', async () => {
    await expect(
      run({fails: true})
    ).rejects.toThrowError('Failed on purpose')
  })
})