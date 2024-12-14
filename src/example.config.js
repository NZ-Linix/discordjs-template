// IMPORTANT INFORMATION //
// If you don't know how to get a User ID / Guild ID, you need to
// enable the Developer Mode in your Discord Settings.
// Go to Settings > Advanced > Developer Mode. Then enable it.
// If you now right click on a user or a guild, you will see an option
// to copy their ID. This is how you get the ID of a user or a guild.

const config = {
    database: {
        path: './database.yml' // The database path.
    },
    development: {
        enabled: false, // If true, the bot will register all application commands to a specific guild (not globally).
        guildId: '',
    },
    commands: {
        prefix: '?', // For message commands, prefix is required. This can be changed by a database.
        message_commands: true, // If true, the bot will allow users to use message (or prefix) commands.
        application_commands: {
            chat_input: true, // If true, the bot will allow users to use chat input (or slash) commands.
            user_context: true, // If true, the bot will allow users to use user context menu commands.
            message_context: true // If true, the bot will allow users to use message context menu commands.
        }
    },
    users: {
        ownerId: 'Your account ID', // The bot owner ID, which is you.
        developers: ['Your account ID', 'Another account ID'] // The bot developers, remember to include your account ID with the other account IDs.
    },
    messages: { // Messages configuration for application commands and message commands handler.
        NOT_BOT_OWNER: 'You do not have the permission to run this command. (Owner only)',
        NOT_BOT_DEVELOPER: 'You do not have the permission to run this command. (Dev only)',
        NOT_GUILD_OWNER: 'You do not have the permission to run this command. (Guild owner only)',
        CHANNEL_NOT_NSFW: 'You cannot run this command in a non-NSFW channel!',
        MISSING_PERMISSIONS: 'You do not have the permission to run this command, missing permissions.',
        COMPONENT_NOT_PUBLIC: 'Only the button creator can use this button.',
        GUILD_COOLDOWN: 'You are currently in cooldown, you have the ability to re-use this command again in \`%cooldown%s\`.'
    }
}

module.exports = config;