const extractMentionedUsers = (message, slackTeamUsers) => {
  const users = message.match(/@[a-z0-9][a-z0-9._-]*/g);
  const usersData = [];

  for (let i = 0; i < slackTeamUsers.length; i += 1) {
      if (users.includes(`@${slackTeamUsers[i].name}`)) {
        usersData.push({ userId: slackTeamUsers[i].id, userName: slackTeamUsers[i].name });
      }
  }
  return usersData;
};

module.exports = extractMentionedUsers;
