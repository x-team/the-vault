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

module.exports = extractMentionedUser;
