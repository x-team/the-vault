const extractMentionedUsers = require('./../extractMentionedUsers');

test('it should extract user facts from message', () => {
  const data = [ { userId: 'U7A9CF0SV', userName: 'raf.wilinski' } ];
  const slackTeamUsers = [{id: "U7A9CF0SV", name:"raf.wilinski"}, {id: "U7A9CF2SV", name:"john.doe"}];
  expect(extractMentionedUsers("Hello @raf.wilinski !", slackTeamUsers)).toEqual(data);
});

test('it should extract user facts from message - multiple', () => {
  const data = [ { userId: 'U7A9CF0SV', userName: 'raf.wilinski' }, { userId: 'U7A9CF2SV', userName: 'jacek.lawniczak' } ];
  const slackTeamUsers = [{id: "U7A9CF0SV", name:"raf.wilinski"}, {id: "U7A9CF2SV", name:"jacek.lawniczak"}];
  expect(extractMentionedUsers("Hello @raf.wilinski @jacek.lawniczak !!!", slackTeamUsers)).toEqual(data);
});
