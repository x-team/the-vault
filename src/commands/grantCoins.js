const isAdmin = require('../utils/isAdmin');
const extractMentionedUsers = require('../utils/extractMentionedUsers');

class GrantCoinsCommand {
  constructor (slack, coinsService) {
    this.slack = slack;
    this.coinsService = coinsService;

    this.init();
  }

  init () {
    this.slack.on('/grantcoin', async (msg, bot) => {
      const users = await extractMentionedUsers(msg.text);

      if (isAdmin(msg.user_name)) {
        for (var i = 0; i < users.length; i++) {
          try {
            const user = await this.coinsService.get(users[i].userId);
            if (!user) {
              await this.coinsService.put({
                id: users[i].userId,
                name: users[i].userName,
                coins: 0
              });
            }

            await this.coinsService.update(users[i].userId, 'SET coins = coins + :one', { ':one': 1 });

            bot.replyPrivate(`Coin added! User now has ${user ? user.coins + 1 : 1} coins.`);
            return;
          } catch (error) {
            bot.replyPrivate('Whoops! An Error occured!');
          }
        }
      } else {
        bot.replyPrivate('You don\'t have a permission to do that!');
      }
    });
  }
}

module.exports = GrantCoinsCommand;
