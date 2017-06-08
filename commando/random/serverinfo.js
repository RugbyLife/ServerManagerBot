//This is a command to print out the server info

const commando = require('discord.js-commando');

class serverInfo extends commando.Command{

  constructor(client){

    super(client, {
      name: 'serverinfo',
      group: 'random',
      memberName: 'serverinfo',
      description: 'displays the server data'
    });
  }

  async run(message, args){

  }
}

module.exports = serverInfo;
