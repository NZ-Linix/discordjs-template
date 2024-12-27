const { Client, Collection, Partials } = require("discord.js");
const CommandsHandler = require("./handler/CommandsHandler");
const { warn, error, info, success } = require("../utils/Console");
const config = require("../config");
const CommandsListener = require("./handler/CommandsListener");
const ComponentsHandler = require("./handler/ComponentsHandler");
const ComponentsListener = require("./handler/ComponentsListener");
const EventsHandler = require("./handler/EventsHandler");
const { QuickYAML } = require('quick-yaml.db');
require('colors');

class App extends Client {
    collection = {
        application_commands: new Collection(),
        message_commands: new Collection(),
        message_commands_aliases: new Collection(),
        components: {
            buttons: new Collection(),
            selects: new Collection(),
            modals: new Collection(),
            autocomplete: new Collection()
        }
    }
    rest_application_commands_array = [];
    login_attempts = 0;
    login_timestamp = 0;
    statusMessages = [
        { name: 'Status 1', type: 4 },
        { name: 'Status 2', type: 4 },
        { name: 'Status 3', type: 4 },
        // Add more or remove statuses here
    ];

    commands_handler = new CommandsHandler(this);
    components_handler = new ComponentsHandler(this);
    events_handler = new EventsHandler(this);

    constructor() {
        super({
            intents: 3276799,
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.Reaction,
                Partials.User
            ],
            presence: {
                activities: [{
                    name: '',
                    type: 4,
                    state: 'Starting...'
                }]
            }
        });
        
        new CommandsListener(this);
        new ComponentsListener(this);
        this.events_handler = new EventsHandler(this);
    }

    startStatusRotation = () => {
        let index = 0;
        setInterval(() => {
            this.user.setPresence({ activities: [this.statusMessages[index]] });
            index = (index + 1) % this.statusMessages.length;
        }, 4000); // Time for status change (in ms)
    }

    connect = async () => {
        warn(`Attempting to connect to App: [ATTEMPT: (${this.login_attempts + 1})]`);

        this.login_timestamp = Date.now();

        try {
            await this.login(process.env.CLIENT_TOKEN);
            this.commands_handler.load();
            this.components_handler.load();
            this.events_handler.load();
            this.startStatusRotation();

            warn('Attempting to register application commands... (!)');
            await this.commands_handler.registerApplicationCommands(config.development);
            success('Successfully registered application commands. Developer Server? ' + 
                                            (config.development.enabled ? '[TRUE]'.green : '[FALSE]'.red));
        } catch (err) {
            error('Failed to connect to the Application. ' + '[RETRY]'.green);
            error(err);
            this.login_attempts++;
            setTimeout(this.connect, 5000);
        }
    }
}

module.exports = App;
