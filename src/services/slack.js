const Slack = require('slack-node');

const testModal = (username, achievementsList, trigger_id) => {
  const slackClient = new Slack(process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN);

  return new Promise((resolve, reject) => {
    let ach = JSON.stringify(achievementsList);
    // let t = typeof achievementsList;
    slackClient.api('dialog.open', {
      trigger_id,
      dialog: JSON.stringify({
        title: `Granting coins to ${username}!`,
        callback_id: 'achievementSelected',
        submit_label: 'Accept',
        elements: [
          // {
          //   label: 'Title',
          //   type: 'text',
          //   name: 'title',
          //   value: 'sdsd',
          //   hint: '30 second summary of the problem',
          // },
          {
            label: 'Achievement',
            type: 'select',
            name: 'urgency',
            options: achievementsList,
            // options: [
            //   { label: 'Low', value: 'Low' },
            //   { label: 'Medium', value: 'Medium' },
            //   { label: 'High', value: 'High' },
            // ],
          },
          {
            label: 'Comment',
            type: 'textarea',
            name: 'comment',
            optional: true,
            value: '',
          },
          // {
          //   label: 'Select the achievement',
          //   type: 'select',
          //   name: 'achievements',
          //   options: achievementsList,
          // },
        ],
      }),
    });
  });
};

const notifyUserAboutCoinGranted = (
  userName,
  totalCoins,
  reason = 'Reason was not provided'
) => {
  const slackClient = new Slack(process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN);

  return new Promise((resolve, reject) => {
    slackClient.api(
      'chat.postMessage',
      {
        channel: `@${userName}`,
        text: `You have been granted 1 new, shiny :coin: for "${reason}". You now have ${totalCoins} :coin:. Redeem them at: https://x-team.com/vault`,
      },
      (err, response) => {
        if (err) {
          reject(err);
        } else if (response.ok === false) {
          reject(response.error);
        } else if (response.ok === true) {
          resolve();
        }
      }
    );
  });
};

const notifyUserAboutCoinsSpent = (userName, cost) => {
  const slackClient = new Slack(process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN);

  return new Promise((resolve, reject) => {
    slackClient.api(
      'chat.postMessage',
      {
        channel: `@${userName}`,
        text: `You have been subtracted ${cost} shiny :coin:`,
      },
      (err, response) => {
        if (err) {
          reject(err);
        } else if (response.ok === false) {
          reject(response.error);
        } else if (response.ok === true) {
          resolve();
        }
      }
    );
  });
};

const notifyActivityLogChannel = message => {
  const slackClient = new Slack(process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN);

  return new Promise((resolve, reject) => {
    slackClient.api(
      'chat.postMessage',
      {
        channel: process.env.ACTIVITY_LOG_CHANNEL,
        text: message,
      },
      (err, response) => {
        if (err) {
          reject(err);
        } else if (response.ok === false) {
          reject(response.error);
        } else if (response.ok === true) {
          resolve();
        }
      }
    );
  });
};

module.exports = {
  notifyUserAboutCoinGranted,
  notifyUserAboutCoinsSpent,
  notifyActivityLogChannel,
  testModal,
};
