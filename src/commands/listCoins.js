const { extractMentionedUser } = require('../utils/extractMentionedUsers');
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

          console.log('Admin ' + msg.user_name + ' requesting vault for ' + msg.text);
          if(msg.text && msg.text.length > 0) {
            const user = await extractMentionedUser(msg.text);
            if (user && user.userId) {
              data.push(await this.coinsService.get(user.userId));
              console.log('Returned data for ' + msg.text);
              console.log(data);
            } else {
              bot.replyPrivate('Whoops, please enter a valid username to view their coins');
            }
          }
          else {
            console.log('Requesting coindata for all users');
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
