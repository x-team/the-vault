const {
  extractMentionedUser,
  extractMentionedUsers,
  extractMentionedUserAndCoins,
  extractMentionedUsersAndCoins
} = require('./../extractMentionedUsers');

test('it should extract user facts from message', () => {
  const text = "Hello <@U7A9CF0SH|jacek.lawniczak>!";
  const data = {
    userId: "U7A9CF0SH",
    userName: "jacek.lawniczak"
  };
  expect(extractMentionedUser(text)).toEqual(data);
});

test('it should extract users facts from message', () => {
  const text = "Hello <@U7A9CF0SH|jacek.lawniczak> <@U7A9CF0SV|raf.wilinski>!!";
  const data = [
    {
      userId: "U7A9CF0SH",
      userName: "jacek.lawniczak"
    },
    {
      userId: "U7A9CF0SV",
      userName: "raf.wilinski"
    }
  ];
  expect(extractMentionedUsers(text)).toEqual(data);
});

test('it should extract users facts from message with coins', () => {
  const text = "<@U7A9CF0SH|jacek.lawniczak> 10";
  const data = {
    userId: "U7A9CF0SH",
    userName: "jacek.lawniczak",
    coins: 10
  };
  expect(extractMentionedUserAndCoins(text)).toEqual(data);
});

test('it should extract users facts from message with coins', () => {
  const text = "Hi <@U7A9CF0SH|jacek.lawniczak> 1, <@U7A9CF0SV|raf> 20 ,<@U7A9CF0SH|raf.wilinski2>  3 !!";
  const data = [
    {
      userId: "U7A9CF0SH",
      userName: "jacek.lawniczak",
      coins: 1
    },
    {
      userId: "U7A9CF0SV",
      userName: "raf",
      coins: 20
    },
    {
      userId: "U7A9CF0SH",
      userName: "raf.wilinski2",
      coins: 3
    }
  ];
  expect(extractMentionedUsersAndCoins(text)).toEqual(data);
});
