const debug = require('debug')('app:command:listcoins');

class SelectCoinsCommand {
  constructor(slack, coinsService) {
    this.slack = slack;
    this.coinsService = coinsService;

    this.init();
  }

  init() {
    this.slack.on('achievementSelected', async (msg, bot) => {
      try {
        let comment = msg.submission.comment;
        // let selectedAchievement = msg.actions[0].selected_options[0].value;
        let a = JSON.stringify(msg);
        bot.replyPrivate(a);
        return;
        let amountOfCoins = JSON.parse(msg.actions[0].selected_options[0].value)
          .amountOfCoins;

        let selectedPath = JSON.parse(msg.actions[0].selected_options[0].value)
          .selectedPath;

        let selectedAchievement = JSON.parse(
          msg.actions[0].selected_options[0].value
        ).achievementName;

        let message = {
          text: `Do you want to grant ${amountOfCoins} coin(s) for ${selectedAchievement}?`,
          attachments: [
            {
              replace_original: true,
              text: 'Add a comment if you want',
              fallback: "You can't add a comment",
              callback_id: 'selectedGoldAmount',
              color: '#3AA3E3',
              attachment_type: 'default',
              actions: [
                {
                  name: 'game',
                  text: ':coin: amount',
                  type: 'select',
                  value: '1',
                  options: [
                    {
                      text: '1',
                      value: `{ "amountOfCoins": 1, "achievementName": "${selectedAchievement}"}`,
                    },
                    {
                      text: '2',
                      value: `{ "amountOfCoins": 2, "achievementName": "${selectedAchievement}"}`,
                    },
                    {
                      text: '3',
                      value: `{ "amountOfCoins": 3, "achievementName": "${selectedAchievement}"}`,
                    },
                    {
                      label: 'Email Address',
                      name: 'email',
                      type: 'text',
                      subtype: 'email',
                      placeholder: 'you@example.com',
                    },
                  ],
                },
                {
                  name: 'game',
                  text: 'Select again',
                  style: 'danger',
                  type: 'button',
                  value: 'war',
                  confirm: {
                    title: 'Are you sure?',
                    text: "Wouldn't you prefer a good game of chess?",
                    ok_text: 'Yes',
                    dismiss_text: 'No',
                  },
                },
                {
                  label: 'Email Address',
                  name: 'email',
                  type: 'text',
                  subtype: 'email',
                  placeholder: 'you@example.com',
                },
              ],
            },
            {
              replace_original: true,
              text: 'Wrong pick?',
              fallback: 'You are unable to grant gold',
              callback_id: 'selectedGoldAmount',
              color: '#3AA3E3',
              attachment_type: 'default',
              actions: [
                {
                  name: 'game',
                  text: 'Select again',
                  style: 'danger',
                  type: 'button',
                  value: 'war',
                  confirm: {
                    title: 'Are you sure?',
                    text: "Wouldn't you prefer a good game of chess?",
                    ok_text: 'Yes',
                    dismiss_text: 'No',
                  },
                },
                {
                  label: 'Email Address',
                  name: 'email',
                  type: 'text',
                  subtype: 'email',
                  placeholder: 'you@example.com',
                },
              ],
            },
          ],
        };
        bot.reply(message);
      } catch (error) {
        debug(error);
        bot.replyPrivate('Whoops! An Error occured!,shiet :/' + error);
      }
    });
  }
}

module.exports = SelectCoinsCommand;
