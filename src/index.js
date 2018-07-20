import { CLIENT_RENEG_WINDOW } from 'tls';

('use strict');

const debug = require('debug')('app');
const AWS = require('aws-sdk');
const DocumentDB = new AWS.DynamoDB.DocumentClient();
const slack = require('serverless-slack');
const DynamoDBService = require('./services/dynamodb');

debug('Database: ' + process.env.COINS_TABLE_NAME);

const CoinsService = new DynamoDBService(
  DocumentDB,
  process.env.COINS_TABLE_NAME
);

const AchievementsService = new DynamoDBService(
  DocumentDB,
  process.env.ACHIEVEMENTS_TABLE_NAME
);

const GrantCoinsCommand = require('./commands/grantCoins');
const ListCoinsCommand = require('./commands/listCoins');
const OverwriteCoinsCommand = require('./commands/overwriteCoins');
const SpendCoinsCommand = require('./commands/spendCoins');
const BeepBoop = require('./commands/beepBoop');

const GrantCoinAction = require('./commands/achievements/grantCoinAction');
const SelectCoinsCommand = require('./commands/achievements/selectCoins');
const ConfirmAchievementCommand = require('./commands/achievements/confirmAchievement');
const SeedDatabaseAction = require('./commands/achievements/seedDatabase');

exports.handler = slack.handler.bind(slack);

new GrantCoinsCommand(slack, CoinsService);
new ListCoinsCommand(slack, CoinsService);
new OverwriteCoinsCommand(slack, CoinsService);
new SpendCoinsCommand(slack, CoinsService);
new BeepBoop(slack, CoinsService);

new GrantCoinAction(slack, AchievementsService);
new SelectCoinsCommand(slack, CoinsService);
new ConfirmAchievementCommand(slack, AchievementsService);
new SeedDatabaseAction(slack, AchievementsService);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});
