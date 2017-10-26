/*
* Example message: "Hello <@U7A9CF0SV|raf.wilinski>!"
*/
const extractMentionedUser = message => {
  const mentionPart = message.split('<')[1].split('>')[0];
  const userId = mentionPart.split('|')[0].split('@')[1];
  const userName = mentionPart.split('|')[1];

  return {
    userId,
    userName
  };
};

const extractMentionedUsers = text => {
  const regex = /<@([a-zA-Z0-9]+)\|([a-z0-9._-]+)>/g;
  const matches = text.match(regex);
  const usersData = [];

  for (let i = 0; i < matches.length; i += 1) {
    usersData.push(extractMentionedUser(matches[i]));
  }

  return usersData;
}

module.exports = {
  extractMentionedUser,
  extractMentionedUsers
};
