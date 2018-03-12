const { extractMentionedUsersAndCoins } = require('../utils/extractMentionedUsers');
const isAdmin = require('../utils/isAdmin');
const { notifyUserAboutCoinsSpent, notifyActivityLogChannel } = require('../services/slack');

class SpendCoinsCommand {
  constructor (slack, coinsService) {
    this.slack = slack;
    this.coinsService = coinsService;

    this.init();
  }

  init () {
    this.slack.on('/drawcoin', async (msg, bot) => {
      const users = await extractMentionedUsersAndCoins(msg.text);

      if (isAdmin(msg.user_name)) {
        for (let i = 0; i < users.length; i += 1) {
          try {
            const user = await this.coinsService.get(users[i].userId);
            const coinsToSubtract = users[i].coins ? users[i].coins : 1;

            if (!user || user.coins === 0 || user.coins < coinsToSubtract) {
              bot.replyPrivate('User does not have enough coins to subtract from');
            } else {
              await this.coinsService.update(users[i].userId, 'SET coins = coins - :cost', { ':cost': coinsToSubtract });
              await notifyUserAboutCoinsSpent(user.name, coinsToSubtract);

              bot.replyPrivate(`Coin subtracted! ${user.name} now has ${user.coins - coinsToSubtract} :coin:.`);
              await notifyActivityLogChannel(`${user.name} has been subtracted to ${user.coins - coinsToSubtract} :coin: by @${msg.user_name}`);
            }
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

module.exports = SpendCoinsCommand;
