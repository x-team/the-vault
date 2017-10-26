const isAdmin = require('../utils/isAdmin');
const { extractMentionedUsers } = require('../utils/extractMentionedUsers');
const { fetchUsersFromTeam, notifyUserAboutCoinGranted } = require('../services/slack');

class GrantCoinsCommand {
  constructor (slack, coinsService) {
    this.slack = slack;
    this.coinsService = coinsService;

    this.init();
  }

  init () {
    this.slack.on('/grantcoin', async (msg, bot) => {
      const slackTeamUsers = await fetchUsersFromTeam();
      const users = await extractMentionedUsers(msg.text, slackTeamUsers);

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

            await this.coinsService.update(users[i].userId, 'SET coins = coins + :one', { ':one': 1 });
            await notifyUserAboutCoinGranted(users[i].userName);

            bot.replyPrivate(`Coin added! ${users[i].userName} now has ${user ? user.coins + 1 : 1} coins.`);
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
