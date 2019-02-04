// getS3Object
module.exports = async ({ s3, event }) => {
  const params = {
    Bucket: event.Bucket,
    Key: event.Key
  };
  const ret = await s3.getObject(params).promise();
  const message = ret.Body.toString();
  return message;
};
