//this commad posts whoever is streamin in the discord server
const commando = require('discord.js-commando');

class streamerCommand extends commando.Command{
  constructor(client) {

    super(client,{
      name: 'streamers',
      group: 'random',
      memberName: 'streamer',
      description: 'shows which people are streaming in the discord'
    });
  }
  async run(message, args){


  }
}

module.exports = streamerCommand;
