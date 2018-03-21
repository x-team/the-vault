'use strict';

const slack = require('serverless-slack');
const DynamoDBService = require('./services/dynamodb');

const GrantCoinsCommand = require('./commands/grantCoins');
const ListCoinsCommand = require('./commands/listCoins');
const OverwriteCoinsCommand = require('./commands/overwriteCoins');
const SpendCoinsCommand = require('./commands/spendCoins');

exports.handler = slack.handler.bind(slack);

new GrantCoinsCommand(slack, DynamoDBService);
new ListCoinsCommand(slack, DynamoDBService);
new OverwriteCoinsCommand(slack, DynamoDBService);
new SpendCoinsCommand(slack, DynamoDBService);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
