class ListCoinsCommand {
  constructor (slack, coinsService) {
    this.slack = slack;
    this.coinsService = coinsService;

    this.init();
  }

  init () {
    this.slack.on('/listvault', async (msg, bot) => {
      try {
        const data = await this.coinsService.getAll();
        let message = 'Vault: \n';

        for (const index in data) {
          message += `\n${data[index].name} - ${data[index].coins} coins`;
        }

        bot.replyPrivate(message);
      } catch (error) {
        bot.replyPrivate('Whoops! An Error occured!');
      }
    });
  }
}

module.exports = ListCoinsCommand;
