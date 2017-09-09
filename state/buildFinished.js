'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

const validateStringField = (event,fieldName,callback) => {
  if (typeof event[fieldName] !== 'string') {
    console.error('Validation Failed: ' + fieldName);
    callback(new Error('Couldn\'t update.'));
    return false;
  }
  return true;
}
const validateNumberField = (event,fieldName,callback) => {
  if (typeof event[fieldName] !== 'number') {
    console.error('Validation Failed: ' + fieldName);
    callback(new Error('Couldn\'t update.'));
    return false;
  }
  return true;
}

module.exports.success = (event, context, callback) => {
  const timestamp = new Date().getTime();

  if (!(validateStringField(event, 'service', callback)
        && validateStringField(event, 'stage', callback)
        //&& validateStringField(event, 'url', callback) // optional for now
        //&& validateStringField(event, 'text', callback)
        && validateNumberField(event, 'buildNumber',callback))) {
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE_STATE,
    Key: {
      service: event.service,
    },
    ExpressionAttributeNames: {
        '#stage': event.stage,
    },
    ExpressionAttributeValues: {
      //':text': event.text,
      //':buildNumber': event.buildNumber,
      ':updatedAt': timestamp,
      ':buildStatus': event,
      //':buildNumber': event.buildNumber
    },
    // ensure we do not override a newer build
    // ConditionExpression: 'attribute_not_exists(' + event.stage + ') OR ' + event.stage + '.buildNumber <= :buildNumber', // TODO: this does not look like i am doing things the way i am supposed to.
    UpdateExpression: 'SET updatedAt = :updatedAt, #stage = :buildStatus ',
    ReturnValues: 'ALL_NEW',
  };

  // update the todo in the database
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      if(error.code && error.code === 'ConditionalCheckFailedException') {
        callback(null,"nothing to do");
      }
      console.error(error);
      callback(new Error('Couldn\'t update.'));
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes),
    };
    callback(null, response);
  });
};
