# ServerManagerBot
This is a bot to manage the Swarmio Discord Server

# How to run the bot:
1) First you need node version 7.0 or higher
2) Then you need to install pm2 in-order to make changes to the bots code without having to stop and restart it
3) To run the bot using pm2 type: pm2 start swarmiobot.js



## Configuration (optional)
`config/settings.json` contains settings for the bot. The settings are server (guild) specific. If the used server cannot be found from the settings, default settings will be used instead.

Use your server's id (e.g. `"123123123123123123"`) to identificate the server for the bot. You can find your Discord server's id from the server settings, under Widget.

**"enable_anti_spam_filtering":** The main anti spam capabilities. `true: enabled, false: disabled`

**"enable_quiet_mode":** Disables all speaking capabilities of the bot. `true: enabled, false: disabled`

**"enable_client_commands":** Allows all clients to input harmless commands like ping. `true: enabled, false: disabled`

**"anti_spam_allow_unsafe_url_suffixes":** Immediately removes links with unsafe extensions. `true: enabled, false: disabled`

**"anti_spam_log_length":** Length of the user specific log. This should always be higher than the other max-setting numbers below. `Number`

**"anti_spam_max_identical_urls_in_message":** How many identical urls there can be in a message before a warning or ban. `Number`

**"anti_spam_max_identical_urls_in_total":** How many identical urls there can be in the last 8 messages before a warning or ban. `Number`

**"anti_spam_max_identical_messages_total":** How many identical messages there can be in the last 8 messages before a warning or ban. `Number`

**"anti_spam_safe_url_suffixes":** List of safe URL-extensions. `Number`

**"anti_spam_warning_count_before_ban":** How many warnings are given before banning the user. `Number`
