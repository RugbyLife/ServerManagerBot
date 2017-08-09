/*** Created by leo 07/24/2017 */

const {Command}  = require('discord.js-commando');

module.exports = class admin extends Command{
    constructor(client){

        super(client,{
            name: 'admin',
            group: 'random',
            memberName: 'admin',
            description: 'This command will ping an admin',
        })
    }
    // hasPermission(message){
    //
    // }

    async run(message){

        message.guild.channels.get('344546320511402004').send(`${message.member.user.username} needs help`);
    }


}