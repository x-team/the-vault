const extractMentionedUser = require('./../extractMentionedUser');

test('it should extract user facts from message', () => {
  const userFacts = {
    userId: 'U7A9CF0SV',
    userName: 'raf.wilinski'
  };
  expect(extractMentionedUser("Hello <@U7A9CF0SV|raf.wilinski>!")).toEqual(userFacts);
});
