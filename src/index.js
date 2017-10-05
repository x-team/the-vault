'use strict';

const slack = require('serverless-slack');
const dynamodb = require('./services/dynamodb');

exports.handler = slack.handler.bind(slack);

require('./commands/grantCoins')(slack, dynamodb);

// Interactive Message handler
slack.on('greetings_click', (msg, bot) => {
  const message = {
    text: msg.actions[0].value,
  };

  bot.reply(message);
});


// Reaction Added event handler
slack.on('reaction_added', (msg, bot) => {
  bot.reply({
    text: ':wave:',
  });
});
