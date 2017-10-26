const Slack = require('slack-node');

const fetchUsersFromChannel = channelId => {
  const slackClient = new Slack(process.env.SLACK_OAUTH_ACCESS_TOKEN);

  return new Promise((resolve, reject) => {
    const data = {
      channel: channelId
    };

    slackClient.api('channels.info', data, (err, response) => {
      if (err) {
          reject(err);
      } else if (response.ok === true) {
          resolve(response.channel.members);
      }
    })
  })
}

const fetchUsersFromTeam = () => {
  const slackClient = new Slack(process.env.SLACK_OAUTH_ACCESS_TOKEN);

  return new Promise((resolve, reject) => {
    slackClient.api('users.list', {}, (err, response) => {
      if (err) {
          reject(err);
      } else if (response.ok === true) {
          resolve(response.members);
      }
    })
  })
}

const notifyUserAboutCoinGranted = (userName) => {
  const slackClient = new Slack(process.env.SLACK_OAUTH_ACCESS_TOKEN);

  return new Promise((resolve, reject) => {
    slackClient.api('chat.postMessage', {
      channel: `@${userName}`,
      text: 'You have been granted 1 new, shiny :coin:'
    }, (err, response) => {
      if (err) {
          reject(err);
      } else if (response.ok === true) {
          resolve();
      }
    })
  })
}

module.exports = {
  fetchUsersFromChannel,
  fetchUsersFromTeam,
  notifyUserAboutCoinGranted
}
