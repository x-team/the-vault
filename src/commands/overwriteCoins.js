const isAdmin = require('../utils/isAdmin');
const { extractMentionedUsersAndCoins } = require('../utils/extractMentionedUsers');

class OverwriteCoinsCommand {
  constructor (slack, coinsService) {
    this.slack = slack;
    this.coinsService = coinsService;

    this.init();
  }

  init () {
    this.slack.on('/overwritecoins', async (msg, bot) => {
      const users = await extractMentionedUsersAndCoins(msg.text);

      if (isAdmin(msg.user_name)) {
        for (let i = 0; i < users.length; i += 1) {
          try {
            const user = await this.coinsService.get(users[i].userId);

            if (!user) {
              await this.coinsService.put({
                id: users[i].userId,
                name: users[i].userName,
                coins: 0
              });
            }

            await this.coinsService.update(users[i].userId, 'SET coins = :current', { ':current': users[i].coins });

            bot.replyPrivate(`Coins updated! ${users[i].userName} now has ${users[i].coins} :coin:.`);
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

module.exports = OverwriteCoinsCommand;
