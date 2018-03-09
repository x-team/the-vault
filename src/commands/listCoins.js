const isAdmin = require('../utils/isAdmin');

class ListCoinsCommand {
  constructor (slack, coinsService) {
    this.slack = slack;
    this.coinsService = coinsService;

    this.init();
  }

  init () {
    this.slack.on('/listvault', async (msg, bot) => {
      try {
        let message = 'Vault: \n';

        if (isAdmin(msg.user_name)) {
          let data = [];
          const user = await extractMentionedUser(msg.text);
          if (user && user.userId) {
            data = await this.coinsService.get(user.userId);
          } else {
            data = await this.coinsService.getAll();
          }

          for (const index in data) {
            message += `\n${data[index].name} - ${data[index].coins}`;
          }
        } else {
          const data = await this.coinsService.get(msg.user_id);
          const coins = data ? data.coins : 0;

          message = `You have ${coins} :coin:`;
        }

        bot.replyPrivate(message);
      } catch (error) {
        bot.replyPrivate('Whoops! An Error occured!');
      }
    });
  }
}

module.exports = ListCoinsCommand;
