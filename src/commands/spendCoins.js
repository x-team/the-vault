const { extractMentionedUserAndCoins } = require('../utils/extractMentionedUsers');
const isAdmin = require('../utils/isAdmin');
const { notifyUserAboutCoinsSpent } = require('../services/slack');

class SpendCoinsCommand {
  constructor (slack, coinsService) {
    this.slack = slack;
    this.coinsService = coinsService;

    this.init();
  }

  init () {
    this.slack.on('/drawcoin', async (msg, bot) => {
      const mentionedUser = await extractMentionedUserAndCoins(msg.text);

      if (isAdmin(msg.user_name)) {
        try {
          const user = await this.coinsService.get(mentionedUser.userId);
          if (!user || user.coins === 0 || user.coins < mentionedUser.coins) {
            bot.replyPrivate('User does not have enough coins to subtract from');
          } else {
            await this.coinsService.update(mentionedUser.userId, 'SET coins = coins - :cost', { ':cost': mentionedUser.coins });
            await notifyUserAboutCoinsSpent(user.name, mentionedUser.coins);

            bot.replyPrivate(`Coin subtracted! ${user.name} now has ${user.coins - mentionedUser.coins} coins.`);
          }
        } catch (error) {
          bot.replyPrivate('Whoops! An Error occured!');
        }
      } else {
        bot.replyPrivate('You don\'t have a permission to do that!');
      }
    });
  }
}

module.exports = SpendCoinsCommand;
