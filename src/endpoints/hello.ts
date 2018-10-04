import { Context, APIGatewayProxyEvent } from 'aws-lambda';

export default async function (event: APIGatewayProxyEvent, context: Context) {

  return {
    statusCode: 200,
    body: JSON.stringify({ hi: 1 }),
  };
}
