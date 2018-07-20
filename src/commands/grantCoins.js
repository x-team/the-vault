const debug = require('debug')('app:command:grantcoins');
const isAdmin = require('../utils/isAdmin');
const {
  extractMentionedUsersAndReason,
} = require('../utils/extractMentionedUsers');
const {
  notifyUserAboutCoinGranted,
  notifyActivityLogChannel,
} = require('../services/slack');

class GrantCoinsCommand {
  constructor(slack, coinsService) {
    this.slack = slack;
    this.coinsService = coinsService;

    this.init();
  }

  init() {
    this.slack.on('/grantcoin', async (msg, bot) => {
      console.log(
        'Attempting /grantcoin for ' +
          msg.user_name +
          ' with message: ' +
          msg.text
      );
      if (isAdmin(msg.user_name)) {
        const { users, reason } = await extractMentionedUsersAndReason(
          msg.text
        );

        debug('Extracted users');
        debug(users);
        debug('Extracted reason');
        debug(reason);

        if (!users.length) {
          debug('No users provided');
          bot.replyPrivate('Please provide users to be granted :coin:!');
          return;
        }

        for (let i = 0; i < users.length; i += 1) {
          try {
            const user = await this.coinsService.get(users[i].userId);

            debug('Userdata');
            debug(user);

            if (!user) {
              debug('User did not exist, so give them a default entry');
              await this.coinsService.put({
                id: users[i].userId,
                name: users[i].userName,
                coins: 0,
              });
            }

            debug('Update user coins');
            await this.coinsService.update(
              users[i].userId,
              'SET coins = coins + :one',
              { ':one': 1 }
            );
            debug('Notify user that they got a coin');
            await notifyUserAboutCoinGranted(
              users[i].userName,
              user ? user.coins + 1 : 1,
              reason
            );
            debug('Notify the channel that the user got a coin');
            await notifyActivityLogChannel(
              `${users[i].userName} was granted 1 :coin: by @${
                msg.user_name
              } ${reason} and now has ${user ? user.coins + 1 : 1} :coin:.`
            );

            debug('Notify user');
            bot.replyPrivate(
              `Coin added! ${users[i].userName} now has ${
                user ? user.coins + 1 : 1
              } :coin:.`
            );
          } catch (error) {
            debug(error);
            bot.replyPrivate('Whoops! An Error occured!');
          }
        }
      } else {
        debug('Invalid permissions');
        bot.replyPrivate("You don't have a permission to do that!");
      }
    });
  }
}

module.exports = GrantCoinsCommand;
