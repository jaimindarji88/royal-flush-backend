'use strict';
const { histogram } = require('./dist');

module.exports.hello = async (event, context) => {
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

module.exports.histogram = async (event, context) => {
  const deck = new Deck();

  const histogram = createHistogram()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: memes.meme,
    }),
  }
};
