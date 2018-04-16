'use strict';

const debug = require('debug')('app');
const AWS = require('aws-sdk');
const DocumentDB = new AWS.DynamoDB.DocumentClient();
const slack = require('serverless-slack');
const DynamoDBService = require('./services/dynamodb');

debug('Database: ' + process.env.COINS_TABLE_NAME);

const CoinsService = new DynamoDBService(DocumentDB, process.env.COINS_TABLE_NAME);

const GrantCoinsCommand = require('./commands/grantCoins');
const ListCoinsCommand = require('./commands/listCoins');
const OverwriteCoinsCommand = require('./commands/overwriteCoins');
const SpendCoinsCommand = require('./commands/spendCoins');

exports.handler = slack.handler.bind(slack);

new GrantCoinsCommand(slack, CoinsService);
new ListCoinsCommand(slack, CoinsService);
new OverwriteCoinsCommand(slack, CoinsService);
new SpendCoinsCommand(slack, CoinsService);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
