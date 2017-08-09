/**
 * Created by leo on 29/06/17.
 */

const commando = require('discord.js-commando');
const bot = require('discord.js');

//called everytime the bot is run or used
class purge extends commando.Command {
    constructor(client) {

        super(client, {
            name: 'purge',
            group: 'admin',
            memberName: 'purge',
            description: 'purges the chat   '
        });

    }

    hasPermission(message){

        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return 'You dont have permission to do that';
        }
        else return true ;

    }

    //called everytime the command is called
    async run(message, args){
        let arg = message.content.split(' ').slice(1);
        var result = arg.join(' ');

        if (message.author.bot) return;

        let messagecount = parseInt(result);
        message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
    }
}

module.exports = purge;