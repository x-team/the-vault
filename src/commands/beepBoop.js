const debug = require('debug')('app:command:listcoins');
const { extractMentionedUser } = require('../utils/extractMentionedUsers');
const isAdmin = require('../utils/isAdmin');

class BeepBoop {
  constructor(slack, coinsService) {
    this.slack = slack;
    this.coinsService = coinsService;

    this.init();
  }

  init() {
    this.slack.on('/beepboop', async (msg, bot) => {
      try {
        bot.replyPrivate('yay');
      } catch (error) {
        debug(error);
        bot.replyPrivate('Whoops! An Error occured!');
      }
    });
  }
}

module.exports = BeepBoop;
