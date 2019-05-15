import Joi, { valid } from 'joi';

import { handOdds } from '../poker';

import { Context, APIGatewayProxyEvent } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEvent, context: Context) {
  if (!event.body) {
    return {
      statusCode: 422,
      message: 'No data sent, please send',
    };
  }

  const query = event.queryStringParameters || {};
  const iters = Number(query.iters) || 1000;
  const data = JSON.parse(event.body);

  const schema = Joi.object({
    hands: Joi.array()
      .items(Joi.string())
      .min(2)
      .max(8)
      .required(),
    board: Joi.string()
      .min(6)
      .max(10),
  });
  const validate = Joi.validate(data, schema);
  if (validate.error) {
    return {
      statusCode: 422,
      body: JSON.stringify(validate.error),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
    };
  }

  const odds = await handOdds(data, iters);

  return {
    statusCode: 200,
    body: JSON.stringify({ odds }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
  };
}
