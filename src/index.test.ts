import { fetchJoke } from './index'

describe('Unit Tests for app handler ', () => {
  it('verifies a successful response', async () => {
    const result = await fetchJoke()
    expect(result).toBeTruthy()
  })
})
