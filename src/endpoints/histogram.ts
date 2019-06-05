import Joi from 'joi';

import { histogram } from '../poker';

import { Context, APIGatewayProxyEvent } from 'aws-lambda';

export async function handler(event: APIGatewayProxyEvent, context: Context) {
  if (!event.body) {
    return {
      statusCode: 422,
      message: 'No data sent, please send',
    };
  }

  const schema = Joi.object({
    hand: Joi.string()
      .min(3)
      .max(4)
      .required(),
    others: Joi.array().items(Joi.string().length(4)),
    board: Joi.string()
      .min(6)
      .max(10),
    seed: Joi.string(),
  });

  const data = JSON.parse(event.body);
  const query = event.queryStringParameters || {};
  const iters = Number(query.iters) || 1000;

  const validate = Joi.validate(data, schema);
  if (validate.error) {
    return {
      statusCode: 422,
      errors: validate.error,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Content-Type': 'application/json',
      },
    };
  }

  const hist = histogram(data, iters);

  return {
    statusCode: 200,
    body: JSON.stringify({ histogram: hist }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Content-Type': 'application/json',
    },
  };
}
