const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const getS3Object = require('./services/getS3Object');
const { S3_BUCKET } = process.env;

exports.lambdaHandler = async (event, context, callback) => {
  const message = await getS3Object({ s3, event, callback });
  return message;
};
