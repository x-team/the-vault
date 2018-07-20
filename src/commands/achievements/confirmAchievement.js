const debug = require('debug')('app:command:listcoins');

class ConfirmAchievementCommand {
  constructor(slack, achievementService) {
    this.slack = slack;
    this.achievementService = achievementService;

    this.init();
  }

  init() {
    this.slack.on('selectedGoldAmount', async (msg, bot) => {
      let m = JSON.stringify(msg);
      let bt = JSON.stringify(bot);

      try {
        let amountOfCoins = JSON.parse(msg.actions[0].selected_options[0].value)
          .amountOfCoins;

        let achievementName = JSON.parse(
          msg.actions[0].selected_options[0].value
        ).achievementName;

        let message = {
          text: `Do you want to grant _user_ ${amountOfCoins} for ${achievementName}?`,
          attachments: [
            {
              replace_original: true,
              text: 'Confirmation',
              fallback: 'You are unable to confirm',
              callback_id: 'Confirmed',
              color: '#3AA3E3',
              attachment_type: 'default',
            },
          ],
        };
        let params = {
          id: '3',
          name: achievementName,
          coins: amountOfCoins,
        };

        await this.achievementService.put(params);
        bot.reply(message);
      } catch (error) {
        debug(error);
        // let yyy = JSON.stringify(error);

        bot.replyPrivate('Whoops! An Error occured! shiet' + error);
      }
    });
  }
}

module.exports = ConfirmAchievementCommand;
