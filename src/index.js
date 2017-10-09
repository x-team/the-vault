'use strict';

const AWS = require('aws-sdk');
const DocumentDB = new AWS.DynamoDB.DocumentClient();
const slack = require('serverless-slack');
const DynamoDBService = require('./services/dynamodb');

const CoinsService = new DynamoDBService(DocumentDB, 'Coins');

const GrantCoinsCommand = require('./commands/grantCoins');
const ListCoinsCommand = require('./commands/listCoins');

exports.handler = slack.handler.bind(slack);

new GrantCoinsCommand(slack, CoinsService); // eslint-disable-line no-new
new ListCoinsCommand(slack, CoinsService); // eslint-disable-line no-new
