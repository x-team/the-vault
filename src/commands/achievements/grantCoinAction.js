const debug = require('debug')('app:command:listcoins');
const { testModal } = require('../../services/slack');

class GrantCoinAction {
  constructor(slack, achievementService) {
    this.slack = slack;
    this.achievementService = achievementService;

    this.init();
  }

  init() {
    this.slack.on('grantCoinAction', async (msg, bot) => {
      try {
        // this.achievementServic;
        // let a = JSON.stringify(msg);
        // let b = JSON.stringify(bot);

        // bot.reply({
        //   text: a + b,
        // });

        let data = [];
        let KeyConditionExpression = 'active = :a';
        let ExpressionAttributeValues = {
          ':a': '1',
        };

        data = await this.achievementService.getByQuery(
          KeyConditionExpression,
          ExpressionAttributeValues
        );
        let achievementsList = [];

        for (const index in data) {
          achievementsList.push({
            label: `${data[index].id} - {${data[index].path}} [${
              data[index].coins
            }]`.substring(0, 75),
            value: `{ "coins": ${data[index].coins}, "ach": "${
              data[index].id
            }", "path": "${data[index].path}"}`.substring(0, 75),
          });
        }
        await testModal(msg.user.name, achievementsList, msg.trigger_id);

        // let achievementsList = [];
        // for (const index in data) {
        //   achievementsList.push({
        //     text: `${data[index].id} - {${data[index].path}} [${
        //       data[index].coins
        //     }]`,
        //     value: `{ "amountOfCoins": ${
        //       data[index].coins
        //     }, "achievementName": "${data[index].id}", "selectedPath": "${
        //       data[index].path
        //     }"}`,
        //   });
        // }

        // let message = {
        //   text: 'Would you like to grant a coin?',
        //   attachments: [
        //     {
        //       text: 'Select the achievement',
        //       fallback: 'You are unable to select the achievements',
        //       callback_id: 'achievementSelected',
        //       color: '#3AA3E3',
        //       attachment_type: 'default',
        //       actions: [
        //         {
        //           name: 'game',
        //           text: 'Achievement',
        //           type: 'select',
        //           options: achievementsList,
        //         },
        //       ],
        //     },
        //   ],
        // };
        // bot.reply(message);
      } catch (error) {
        debug(error);
        bot.replyPrivate('Whoops! An Error occuredooo!' + error);
      }
    });
  }
}

module.exports = GrantCoinAction;
