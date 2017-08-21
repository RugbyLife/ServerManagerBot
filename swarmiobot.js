const Discord = require('discord.js');
const commando = require('discord.js-commando');
const path = require('path');

const client = new Discord.Client();
const bot = new commando.Client({
    commandPrefix: '!',
    unknownCommandResponse: false,
    disableEveryone: true
});

const Immutable = require('immutable');

// Strings
const Auth = require("./config/auth.json");
const Strings = require('./config/strings.json');

// Utilities
const Settings = require('./util/module.inc.setting.js')();
const Mute = require('./util/module.inc.mute')();
const AntiSpam = require('./util/module.inc.antispam')();
const Command = require('./util/module.inc.command')();

// Commands
const commands = {
    "about": require('./commands/module.inc.about.js')(),
    "mention": require('./commands/module.inc.mention.js')(),
    "select": require('./commands/module.inc.select.js')(),
    "ping": require('./commands/module.inc.ping')(client),
    "version": require('./commands/module.inc.version')(),
    "say": require('./commands/module.inc.say')(client)
};

process.on('unhandledRejection', console.error);

const MAX_SERVERS = 12;

let guildSettings = new Immutable.Map({});

client.login(Auth.token);
bot.login(Auth.token);

/**
 * An initial connection handler.
 */
client.on('ready', () => {

    // Make sure the capacity is not exceeded.
    if (client.guilds.array().length > MAX_SERVERS) {
        console.log(`Too many concurrent servers (${client.guilds.array().length > 16}).`);
        console.log(`Servers are limited because anti spam features must stay efficient.`);
        console.log(`If you'd like to bypass this check, see swarmiobot.js or make an another Application.`);
        console.log('Closing down...');
        process.exit(1);
    }else {
        console.log(`Successfully logged in as ${client.user.username}.`);
        console.log(`Serving ${client.guilds.array().length} server(s).`);
    }

    // Set settings for the owner.
    if (Auth.owner !== undefined && Auth.owner !== '') {
        guildSettings = guildSettings.set(Auth.owner, Settings.getGuildSetting(Auth.owner, true));
        console.log(`Owner ${Auth.owner} registered.`);
    } else {
        console.log(`Parameter "owner" is not set in Auth.json.`);
    }

    // Set settings for each guild.
    client.guilds.forEach((guild) => {
        guildSettings = guildSettings.set(guild.id, Settings.getGuildSetting(guild.id));
        console.log(`Settings registered for ${guild.name} by ${guild.owner.user.username}. Members: ${guild.memberCount}.`);
    });
});

/**
 * A disconnection handler.
 */
client.on('disconnected', () => {
    console.log('Lost connection, exiting...');
    process.exit(1);
});

/**
 * On joining a new guild.
 */
client.on('guildCreate', (guild) => {
    console.log('Joined to a new guild: ', guild.name);
    guildSettings.set(guild.id, Settings.getGuildSetting(guild.id));
});

/**
 * The main message handler.
 */
client.on('message', Message => {
    try {

        // Identify the message source.
        const sourceId = Message.guild !== null
            ? Message.guild.id
            : Message.author !== null ? Message.author.id : undefined;
        const owner = sourceId === Auth.owner;

        // We'll listen messages only if on a guild or from the owner.
        if (
            sourceId !== undefined &&
            (Message.guild !== null || owner)
        ) {

            // Load guild settings.
            const settingsContainer = guildSettings.has(sourceId)
                ? guildSettings.get(sourceId)
                : {};

            // Anti spam measures.
            if (settingsContainer !== undefined &&
                settingsContainer['enable_anti_spam_filtering'] &&
                AntiSpam.isSpam(sourceId, Message.author.id, Message, settingsContainer)
            ) {
                // Mute the filthy peasant.
                const target = Message.member;

                    if (Mute.execute(target)) {

                        // Mute successful.
                        if (!settingsContainer['enable_quiet_mode']) {
                            Message.channel.send(`${Strings.util.antispam.success_0}` +
                                `${target.user.username}` +
                                `${Strings.util.antispam.success_1}`);
                        }
                        AntiSpam.clearUserHistory(sourceId, Message.author.id);

                        setTimeout(() => {
                            AntiSpam.clearUserHistory(sourceId, Message.author.id);
                        },60000);
                    }
            }

            // Client commands.
            if (
                settingsContainer !== undefined &&
                settingsContainer['enable_client_commands']
            ) {
                const commandContainer = Command.getContainer(Message, Auth.id);
                if (commandContainer.hasOwnProperty('cmd')) {
                    // Message should always be provided for special actions, but the content should always
                    // be read from the commandContainer. Public strings are not safe!
                    if (commands.hasOwnProperty(commandContainer['cmd'])) {
                        const command = commands[commandContainer['cmd']];
                        try {
                            command.execute(Message, commandContainer['str']);
                        } catch (e) {
                            console.log(`Executing command (${commandContainer['cmd']}) failed. Please check your code.`)
                        }
                    } else {
                        console.log(`Invalid command (${commandContainer['cmd']}) inputted.`);
                    }
                }
            }
        }
    } catch (e) {
        console.log(e.stack);
        console.log(process.version);
        console.log('Error: Failed to process a message.');
    }
});

/*
*
*---------------------------------------------------------
*antispam stuff above this code
*This is the code responseable for different commands
*/



bot.registry
    .registerDefaultTypes()
    .registerGroups([
        ['random', 'Random'],
        ['admin', 'Admin Commands']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commando'));

bot.on('ready', () => {
    console.log('Logged in!');
    bot.user.setGame('League');
});


// //using commando client
// bot.registry.registerGroup('random', 'Random');
//
// //registers a few default commands
// bot.registry.registerDefaults({
//     help: false
// });
//
// //creating each command in a seperate file
// bot.registry.registerCommandsIn(__dirname + "/commando");

var prefix = "!";

// this welcomes users to the server and sends them a personal message about the server
client.on('guildMemberAdd', member => {
  let guild = member.guild;
      guild.defaultChannel.send(`Please welcome ${member.user} to the server!`);

  member.send('Welcome to the server. Please read the pinned rules in the #announcements channel as soon as possible. We are excited to have you here! ');

});

// this is a purge command that deletes a certain number of messages in the channel its called
client.on('message', message => {

  let args = message.content.split(' ').slice(1);
    var result = args.join(' ');

  if(!message.content.startsWith(prefix)) return;
  if( message.author.bot) return;

    if( message.content.startsWith(prefix + "purge")){
      let messagecount = parseInt(result);
      message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages));
    }
});

client.on('message', message => {
    /*

        Discord quietly changed the Create Guild API endpoint, small bots (10 guilds
        or fewer) are able to create guilds programmatically now.

        This will have your bot create a new guild and create a role with the
        administrator permission, and the single line of code at the bottom will apply
        it to you when you execute it when you join the guild.

    */

    /* ES6 Promises */


        if(message.content.startsWith(prefix + "tour")){


         /* ES6 Promises */
            client.user.createGuild('Example Guild', 'Us-East').then(guild => {
                guild.channels.get('344546320511402004').createInvite().then(invite => client.users.get('226514211084304390').send(invite.url));
                guild.createRole({name:'admin', permissions:['ADMINISTRATOR']}).then(role => client.users.get('226514211084304390').send(role.id)).catch(error => console.log(error))
            });

            /* ES8 async/await */
            async function createGuild(client, message) {
                try {
                    const guild = await client.user.createGuild('Example Guild', 'Us-East');
                    const invite = await guild.channels.get('344546320511402004').createInvite();
                    await message.author.send(invite.url);
                    const role = await guild.createRole({ name:'admin', permissions:['ADMINISTRATOR'] });
                    await message.author.send(role.id);
                } catch (e) {
                    console.error(e);
                }
            }

            console .log('It worked');
            // createGuild(client, message);
            // // Run this once you've joined the bot created guild.
            // message.member.addRole('345600866247639052');
             }
});

//
// client.on('message', message => {
//     if(message.content.startsWith(prefix + "deleteserver")){
//         const servID = client.guilds.get("id")
//
//         console.log(servID)
//         // setTimeout(() =>{
//         //     guild.delete();
//         // },86400000);
//     }
//
// });