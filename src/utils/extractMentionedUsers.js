const extractMentionedUser = text => {
  const matches = text.match(/<@.*|.*>/);

  if (!matches) {
    return null;
  }
  const mentionPart = text.split('<')[1].split('>')[0];
  const userId = mentionPart.split('|')[0].split('@')[1];
  const userName = mentionPart.split('|')[1];

  return {
    userId,
    userName
  };
};

const extractMentionedUserAndCoins = text => {
  const regex = /<@([a-zA-Z0-9]+)\|([a-z0-9._-]+)>\s+([0-9]{1,3})/;
  const matches = text.match(regex);
  const userId = matches[1];
  const userName = matches[2];
  const coins = parseInt(matches[3]);

  return {
    userId,
    userName,
    coins
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

const extractMentionedUsersAndCoins = text => {
  const regex = /<@[a-zA-Z0-9]+\|[a-z0-9._-]+>\s+[0-9]{1,3}/g;

  const matches = text.match(regex);
  const usersData = [];

  for (let i = 0; i < matches.length; i += 1) {
    usersData.push(extractMentionedUserAndCoins(matches[i]));
  }

  return usersData;
}

const extractMentionedUsersAndReason = text => {
  const usersRegex = /<@[a-zA-Z0-9]+\|[a-z0-9._-]+>/g;
  const usersMatch = text.match(usersRegex) || [];

  const reasonRegex = /<@[a-zA-Z0-9]+\|[a-z0-9._-]+>\s+([^>]*)$/;
  const reasonMatch = text.match(reasonRegex);
  const reason = reasonMatch ? reasonMatch[1] : null;

  const users = [];

  for (let i = 0; i < usersMatch.length; i += 1) {
    users.push(extractMentionedUser(usersMatch[i]));
  }

  return { users, reason };
}

module.exports = {
  extractMentionedUser,
  extractMentionedUsers,
  extractMentionedUserAndCoins,
  extractMentionedUsersAndCoins,
  extractMentionedUsersAndReason
};
