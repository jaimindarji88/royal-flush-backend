import { Context, APIGatewayProxyEvent } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEvent, context: Context) {
  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
}
