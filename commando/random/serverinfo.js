//This is a command to print out the server info

const commando = require('discord.js-commando');

class serverInfo extends commando.Command{

  constructor(client){

    super(client, {
      name: serverinfo,
      group: random,
      memberName: serverinfo,
      description: 'This command displays the number of people in the server'
￼     });


  async run(message, args){

  }
}

module.exports = serverInfo;
