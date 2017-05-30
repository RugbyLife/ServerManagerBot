//imports commando lib
// this is a commad tht displays minecraft server status.
const commando = require('discord.js-commando');

//called everytime the bot is run or used
class minecraft extends commando.Command {
  constructor(client) {

    super(client, {
      name: 'minecraft',
      group: 'random',
      memberName: 'minecraft',
      description: 'displays minecraft server status'
    });

  }

  //called everytime the command is called
  async run(message, args){

    var request = require('request');
    var mcIP = 'mc.swarmio.gg'; // Your MC server IP
    var url = 'http://mcapi.us/server/status?ip=' + mcIP ;

    request(url, function(err, response, body) {
        if(err) {
            console.log(err);
            return message.reply('Error getting Minecraft server status...');
        }
        body = JSON.parse(body);
        var status = '*Minecraft server is currently offline*';
        if(body.online) {
            status = '**Minecraft** server is **online**  -  ';
            if(body.players.now) {
               status += '**' + body.players.now + '** people are playing!';
           } else {
               status += '*Nobody is playing!*';
           }
      }
       message.reply(status);
    });

  }
}

module.exports = minecraft;
