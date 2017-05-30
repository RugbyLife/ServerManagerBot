//imports commando lib
// this is a commad tht rolls a normal dice
const commando = require('discord.js-commando');

//called everytime the bot is run or used
class DiceRollCommand extends commando.Command {
  constructor(client) {

    super(client, {
      name: 'roll',
      group: 'random',
      memberName: 'roll',
      description: 'Rolls a die'
    });

  }

  //called everytime the command is called
  async run(message, args){
    var roll = Math.floor(Math.random() * 6) + 1;
    message.reply("You rolled a " + roll);
  }
}

module.exports = DiceRollCommand;
