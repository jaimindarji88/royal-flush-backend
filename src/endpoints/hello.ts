import { Context, APIGatewayProxyEvent } from 'aws-lambda';

import { nit } from '../nit_api';

export default async function (event: APIGatewayProxyEvent, context: Context) {

  const a = await nit(['.', '.'], 'As3s4c6c9d');
  console.log(a);
  return {
    statusCode: 200,
    body: JSON.stringify(a),
  };
}
