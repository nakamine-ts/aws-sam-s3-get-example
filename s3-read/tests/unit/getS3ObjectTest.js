'use strict';

const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const assert = require('power-assert');
const getS3Object = require('../../services/getS3Object');

const credentials = new AWS.SharedIniFileCredentials({profile: 'localstack'});
AWS.config.credentials = credentials;

const config = {
  endpoint: 'http://localhost:4572',
  s3ForcePathStyle: 'true',
}
const s3 = new AWS.S3(config);

describe('local stack test suit for bucket object', () => {
  let bucket, object, event;

  /*
   * create bucket and bucket object
   */
  before(async () => {
    const now   = new Date().getTime();
    bucket = `test-bucket-${now}`;
    object = `message_${now}.txt`;
    event = {
      Bucket: bucket,
      Key: object,
    };
    await s3.createBucket({Bucket: bucket}).promise();
    await s3.putObject({
      Bucket: bucket,
      Key: object,
      ContentType: 'text/plain',
      Body: fs.readFileSync(path.join(__dirname, '..', 'fixtures', 'message.txt')),
    }).promise();
  });

  it('successfully get an object', async () => {
    const message = await getS3Object({s3, event});
    assert.equal(message, 'Hi, there.\n');
  });

  // TODO: write test for non-exist bucket object

  // TODO: write test for non-exist bucket

  /*
   * delete all bucket objects and remove bucket
   */
  after(async () => {
    await s3.deleteObject({
      Bucket: bucket,
      Key: object,
    }).promise();
    await s3.deleteBucket({Bucket: bucket}).promise();
  });
});
