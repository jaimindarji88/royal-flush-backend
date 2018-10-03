import { Context, APIGatewayProxyEvent } from 'aws-lambda';

import { nit } from '../nit_api';

export default async function (event: APIGatewayProxyEvent, context: Context) {
  const odds = nit(['.', '.'], 'As2c4d9s10c');

  return {
    statusCode: 200,
    body: JSON.stringify(odds),
  };
}
