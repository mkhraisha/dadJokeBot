import { APIGatewayProxyEvent } from 'aws-lambda'
import { handler } from './index'

describe('Unit Tests for app handler ', () => {
  it('verifies a successful response', async () => {
    const event: APIGatewayProxyEvent = {
      queryStringParameters: { a: '1' }
    } as any

    const result = await handler(event)

    expect(result.statusCode).toEqual(200)
  })
})
