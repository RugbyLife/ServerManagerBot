/*** Created by leo 07/24/2017 */

const {Command}  = require('discord.js-commando');

module.exports = class help extends Command{
    constructor(client){

        super(client,{
            name: 'help',
            group: 'random',
            memberName: 'help',
            description: 'depending on user prints out what commands can be used in the server',
            args: [
                {
                    key:'member',
                    prompt: 'How may I be of service, commands for a list commands or admin to get a hold of an admin',
                    type: 'member',
                },
                {
                    key:'commands',
                    prompt:'Check your DMs.',
                    type:'string'
                },
                {
                    key:'admin',
                    prompt: 'an admin was notified',
                    type:'string'
                }
            ]
        })
    }
    // hasPermission(message){
    //
    // }

    async run(messages, args){
        const {member, commands, admin} = args;

        if(args === commands){
            const cmd1 = 'Tournaments: This command provides link to the tournament list page in the portal';
            const cmd2 = 'Minecraft: This command provides the status of the Swarmio Minecraft server.';
            const cmd3 = 'diceroll: Rolls a dice between the numbers 1-6.';

            member.send('The commands you have access to are: \n ' +  cmd1 + cmd2 + cmd3);
        }

        if(admin){

        }


    }
}