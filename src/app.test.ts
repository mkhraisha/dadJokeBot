import { fetchJoke } from './app'

describe('Unit Tests for app handler ', () => {
  it('verifies a successful response', async () => {
    const result = await fetchJoke()
    expect(result).toEqual({
      attachments: [
        {
          fallback: expect.any(String),
          footer: expect.any(String),
          text: expect.any(String)
        }
      ],
      response_type: expect.any(String),
      username: expect.any(String)
    })
  })
})
