'use strict';

const AWS = require('aws-sdk');
const DocumentDB = new AWS.DynamoDB.DocumentClient();
const slack = require('serverless-slack');
const DynamoDBService = require('./services/dynamodb');

const CoinsService = new DynamoDBService(DocumentDB, 'Coins');

const GrantCoinsCommand = require('./commands/grantCoins');
const ListCoinsCommand = require('./commands/listCoins');
const OverwriteCoinsCommand = require('./commands/overwriteCoins');

exports.handler = slack.handler.bind(slack);

new GrantCoinsCommand(slack, CoinsService);
new ListCoinsCommand(slack, CoinsService);
new OverwriteCoinsCommand(slack, CoinsService);
