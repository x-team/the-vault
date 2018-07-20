const debug = require('debug')('app:command:listcoins');

class SeedDatabaseAction {
  constructor(slack, achievementService) {
    this.slack = slack;
    this.achievementService = achievementService;

    this.init();
  }

  init() {
    this.slack.on('SeedDatabaseAction', async (msg, bot) => {
      try {
        let achievements = [
          {
            id: 'Battle for Gold I',
            coins: 1,
            path: 'Hero',
            active: '1',
          },
          {
            id: 'Battle for Gold II',
            coins: 2,
            path: 'Hero',
            active: '0',
          },
          {
            id: 'Battle for Gold III',
            coins: 3,
            path: 'Hero',
            active: '0',
          },
          {
            id: 'Save Princess Peach',
            coins: 1,
            path: 'Gamer',
            active: '0',
          },
          {
            id: 'Save Zelda',
            coins: 2,
            path: 'Gamer',
            active: '1',
          },
          {
            id: 'Mentor someone',
            coins: 2,
            path: 'Unleasher',
            active: '1',
          },
          {
            id: 'Meditate',
            coins: 1,
            path: 'Strategist',
            active: '1',
          },
          {
            id: 'Attend a conference',
            coins: 2,
            path: 'Seeker',
            active: '1',
          },
          {
            id: 'Join an X-Outpost',
            coins: 3,
            path: 'Explorer',
            active: '1',
          },
          {
            id: 'Build a drone',
            coins: 1,
            path: 'Explorer',
            active: '1',
          },
        ];
        Promise.all(
          achievements.map(achiev => this.achievementService.put(achiev))
        );
        bot.reply({ text: 'seed complete' });
      } catch (error) {
        debug(error);
        bot.replyPrivate('Whoops! An Error occured! seed' + error);
      }
    });
  }
}

module.exports = SeedDatabaseAction;
