const debug = require('debug')('app:command:overwritecoins');
const isAdmin = require('../utils/isAdmin');
const { extractMentionedUsersAndCoins } = require('../utils/extractMentionedUsers');
const { notifyActivityLogChannel } = require('../services/slack');

class OverwriteCoinsCommand {
  constructor (slack, coinsService) {
    this.slack = slack;
    this.coinsService = coinsService;

    this.init();
  }

  init () {
    this.slack.on('/overwritecoins', async (msg, bot) => {
      debug('Received message ['+msg.text+'] from '+msg.user_name);
      const users = await extractMentionedUsersAndCoins(msg.text);

      if (isAdmin(msg.user_name)) {
        for (let i = 0; i < users.length; i += 1) {
          try {
            debug('Retrieve users');
            const user = await this.coinsService.get(users[i].userId);

            if (!user) {
              debug('User has no entries, create a default one');
              await this.coinsService.put({
                id: users[i].userId,
                name: users[i].userName,
                coins: 0
              });
            }

            debug('Update users coins to '+ users[i].coins);
            await this.coinsService.update(users[i].userId, 'SET coins = :current', { ':current': users[i].coins });
            debug('Notify user');

            bot.replyPrivate(`Coins updated! ${users[i].userName} now has ${users[i].coins} :coin:.`);
            debug('Notify channel');
            await notifyActivityLogChannel(`${users[i].userName} has been overwritten to ${users[i].coins} :coin: by @${msg.user_name}`);
          } catch (error) {
            debug(error);
            bot.replyPrivate('Whoops! An Error occured!');
          }
        }
      } else {
        debug('Invalid permissions');
        bot.replyPrivate('You don\'t have a permission to do that!');
      }
    });
  }
}

module.exports = OverwriteCoinsCommand;
