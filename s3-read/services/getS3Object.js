// getS3Object
module.exports = async ({s3, event, bucket}) => {
  const params = {
    Bucket: bucket,
    Key: event.Key
  };
  const ret = await s3.getObject(params).promise();
  const message = ret.Body.toString();
  return message;
};
