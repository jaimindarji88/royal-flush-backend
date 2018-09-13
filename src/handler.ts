import { Context, APIGatewayProxyEvent } from 'aws-lambda';

export const hello = async (event: APIGatewayProxyEvent, context: Context) => {
  if (event.body) {
    return {
      statusCode: 200,
      body: JSON.stringify(JSON.parse(event.body)),
    };
  }

  return { event, message: 'Go Serverless v1.0! Your function executed successfully!' };
};

export const histogram = async (event: APIGatewayProxyEvent, context: Context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'memes.meme',
    }),
  };
};
