const isAdmin = require('../utils/isAdmin');
const extractMentionedUser = require('../utils/extractMentionedUser');

class GrantCoinsCommand {
  constructor (slack, coinsService) {
    this.slack = slack;
    this.coinsService = coinsService;

    this.init();
  }

  init () {
    this.slack.on('/grantcoin', async (msg, bot) => {
      const { userId, userName } = extractMentionedUser(msg.text);

      if (isAdmin(msg.user_name)) {
        try {
          const user = await this.coinsService.get(userId);

          if (!user) {
            await this.coinsService.put({
              id: userId,
              name: userName,
              coins: 0
            });
          }

          await this.coinsService.update(userId, 'SET coins = coins + :one', { ':one': 1 });

          bot.replyPrivate(`Coin added! User now has ${user ? user.coins + 1 : 1} coins.`);
          return;
        } catch (error) {
          bot.replyPrivate('Whoops! An Error occured!');
        }
      } else {
        bot.replyPrivate('You don\'t have a permission to do that!');
      }
    });
  }
}

module.exports = GrantCoinsCommand;
