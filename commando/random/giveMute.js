/*** Created by leo on 10/07/17.
 */

const {Command} = require('discord.js-commando');

module.exports = class givemute extends Command{
    constructor(client){

        super(client, {
            name: 'givemute',
            group: 'random',
            memberName: 'givemute',
            description: 'allows admins to mute a user that misbehaves in chat',
            args: [
                {

                    key:'member',
                    prompt:'Which user do you want to mute?',
                    type:'member'
                }
                ,
                {
                    key: 'reason',
                    prompt: 'please provide a reason why to mute a user: ',
                    type: 'string'
                },
                {
                    key:'mutetime',
                    prompt: 'enter a desired mute time: ',
                    type: 'integer'
                }
            ]
        });
    }

    hasPermission(message){

        if (!message.member.hasPermission('MANAGE_ROLES')) {
            return 'You dont have permission to do that';
        }
            else return true ;

    }

    async run(message,args) {

        const{member,reason, mutetime} = args;

        // console.log(giveMuting);
        // console.log(reason);


        const warning = `You have muted, Reason: ${reason} and for: ${mutetime} mins `;

        const role = member.addRole('316601940068925440');
        member.send(warning);

        setTimeout(() =>{
            const role = member.removeRole('316601940068925440');
            console.log(`${member.username} was unmuted`)
        },mutetime*60000);



    }
};
