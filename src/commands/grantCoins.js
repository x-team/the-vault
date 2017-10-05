class GrantCoinsCommand {
  constructor (slack) {
    this.slack = slack;

    this.init();
  }

  init () {
    this.slack.on('/grantCoins', (msg, bot) => {
      // To be added
      bot.replyPrivate(msg);
    });
  }
}

module.exports = GrantCoinsCommand;
