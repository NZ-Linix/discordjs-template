const { ChatInputCommandInteraction } = require("discord.js");
const App = require("../../client/App");
const ApplicationCommand = require("../../structure/ApplicationCommand");

module.exports = new ApplicationCommand({
    command: {
        name: 'help',
        description: 'Replies with a list of available application commands.',
        type: 1,
        options: []
    },
    options: {
        cooldown: 10000
    },
    /**
     * 
     * @param {App} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.reply({
            content: `${client.collection.application_commands.map((cmd) => '\`/' + cmd.command.name + '\`').join(', ')}`
        });
    }
}).toJSON();