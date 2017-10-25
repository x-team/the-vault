const { fetchUsersFromTeam } = require('../services/slack');

const extractMentionedUsers = async (message) => {
  const users = message.match(/@[a-z0-9][a-z0-9._-]*/g);
  const slackTeamUsers = await fetchUsersFromTeam();

  let usersData = [];

  for (var i = 0; i < slackTeamUsers.length; i++) {
      if (users.includes('@' + slackTeamUsers[i].name)) {
        usersData.push({userId: slackTeamUsers[i].id, userName: slackTeamUsers[i].name});
      }
  }

  return usersData;
};

module.exports = extractMentionedUsers;
