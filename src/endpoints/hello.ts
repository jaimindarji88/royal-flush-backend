import { Context, APIGatewayProxyEvent } from 'aws-lambda';

const hello = async (event: APIGatewayProxyEvent, context: Context) => {
  if (event.body) {
    return {
      statusCode: 200,
      body: JSON.stringify(JSON.parse(event.body)),
    };
  }

  return { event, message: 'Go Serverless v1.0! Your function executed successfully!' };
};

export default hello;
