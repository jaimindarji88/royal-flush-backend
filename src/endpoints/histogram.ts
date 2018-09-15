import Joi from 'joi';

import { histogram } from '../poker';

import { Context, APIGatewayProxyEvent } from 'aws-lambda';

export default async function (event: APIGatewayProxyEvent, context: Context) {
  if (!event.body) {
    return {
      statusCode: 422,
      message: 'No data sent, please send',
    };
  }

  const schema = Joi.object({
    hand: Joi.string().length(4).required(),
    others: Joi.array().items(Joi.string().length(4)),
    board: Joi.string().min(6).max(10),
    iters: Joi.number(),
  });

  let hist;
  const data = JSON.parse(event.body);
  const result = Joi.validate(data, schema);

  if (result.error) {
    return {
      statusCode: 422,
      errors: result.error,
    };
  }

  if (data.iters) {
    hist = histogram(data.hand, data.others, data.board, data.iters);
  } else {
    hist = histogram(data.hand, data.others);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ histogram: hist }),
  };
}
