import { Context, APIGatewayProxyEvent } from 'aws-lambda';

import { nit } from '../nit_api';

export async function handler(event: APIGatewayProxyEvent, context: Context) {

  const odds = await nit(['.', '.'], 'As3s4c6c9d');

  return {
    statusCode: 200,
    body: JSON.stringify(event),
  };
}
