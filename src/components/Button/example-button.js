const { ButtonInteraction } = require("discord.js");
const App = require("../../client/App");
const Component = require("../../structure/Component");

module.exports = new Component({
    customId: 'example-button-id',
    type: 'button',
    /**
     * 
     * @param {App} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {

        await interaction.reply({
            content: 'Replied from a Button interaction!',
            ephemeral: true
        });

    }
}).toJSON();