import { Context, S3Event } from 'aws-lambda';

module.exports.hello = async (event: S3Event, context: Context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

module.exports.histogram = async (event: S3Event, context: Context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'memes.meme',
    }),
  }
};
