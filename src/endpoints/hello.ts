import { Context, APIGatewayProxyEvent } from 'aws-lambda';

import { nit } from '../nit_api';

export default async function (event: APIGatewayProxyEvent, context: Context) {

  const a = nit(['.', '.'], 'As3s4c6c9d');

  return {
    statusCode: 200,
    body: JSON.stringify(a),
  };
}
