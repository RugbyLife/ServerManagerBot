
const {Command} = require('discord.js-commando');
const {RichEmbed} = require('discord.js');

module.exports = class warn extends Command{
    constructor(client){

        super(client, {
            name: 'warn',
            group: 'admin',
            memberName: 'warn',
            description: 'warns a user to behave in chat',
            args: [
                {

                    key:'user',
                    prompt:'Which user do you want to message?',
                    type:'user'
                },
                {
                    key: 'reason',
                    prompt: 'please provide a reason why to warn user',
                    type: 'string'
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

        const warning = 'You have been warned, please stop(reason): ';
        const{user,reason} = args;
        return user.send(warning + reason);

        console.log(warning);
        console.log(reason);


    }
};
