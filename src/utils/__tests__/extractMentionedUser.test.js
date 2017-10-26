const { extractMentionedUser, extractMentionedUsers } = require('./../extractMentionedUsers');

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
