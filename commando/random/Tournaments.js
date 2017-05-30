//this commad posts the link to the tournaments page

//imports commando lib
const commando = require('discord.js-commando');

//called everytime the bot is run or used
class TournametCommand extends commando.Command {
  constructor(client) {

    super(client, {
      name: 'tournaments',
      group: 'random',
      memberName: 'tournaments',
      description: 'when pinged the command displays all upcoming tournaments through link provided'
    });

  }

  //called everytime the command is called
  async run(message, args){

    var link = 'https://portal.swarmio.gg/#!/tournaments/1/list';

    message.reply('To check upcoming tournaments please open link: ' + link);
  }
}

module.exports = TournametCommand;
