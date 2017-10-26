const Slack = require('slack-node');

const notifyUserAboutCoinGranted = userName => {
  const slackClient = new Slack(process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN);

  return new Promise((resolve, reject) => {
    slackClient.api('chat.postMessage', {
      channel: `@${userName}`,
      text: 'You have been granted 1 new, shiny :coin:'
    }, (err, response) => {
      if (err) {
          reject(err);
      } else if (response.ok === false) {
          reject(response.error);
      } else if (response.ok === true) {
          resolve();
      }
    })
  })
}

const notifyUserAboutCoinsSpent = (userName, cost) => {
  const slackClient = new Slack(process.env.SLACK_BOT_USER_OAUTH_ACCESS_TOKEN);

  return new Promise((resolve, reject) => {
    slackClient.api('chat.postMessage', {
      channel: `@${userName}`,
      text: `You have been subtracted ${cost} shiny :coin:`
    }, (err, response) => {
      if (err) {
          reject(err);
      } else if (response.ok === false) {
          reject(response.error);
      } else if (response.ok === true) {
          resolve();
      }
    })
  })
}

module.exports = {
  notifyUserAboutCoinGranted,
  notifyUserAboutCoinsSpent
}
