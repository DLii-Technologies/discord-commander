"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command_1 = require("./command");
const command_registrar_1 = require("./command_registrar");
class DiscordCommander extends discord_js_1.Client {
    /**
     * Create a new DiscordCommander Discord bot
     */
    constructor(clientId) {
        super();
        /**
         * The command prefix
         */
        this.commandPrefix = '!';
        this.__clientId = clientId;
        this.__registrar = new command_registrar_1.default();
    }
    /**
     * Register the event listeners
     */
    registerListeners() {
        this.on("message", this.onMessage);
    }
    /**
     * Start the bot
     */
    boot() {
        this.registerListeners();
        this.login(this.__clientId);
    }
    // Event Handlers ------------------------------------------------------------------------------
    /**
     * Invoked when a message is received from Discord
     */
    onMessage(message) {
        var name = message.content.split(' ')[0];
        if (name.startsWith(this.commandPrefix) && name.length > this.commandPrefix.length) {
            // Shave off the prefix
            if (this.__registrar.has(name.substr(this.commandPrefix.length))) {
                this.__registrar.invoke(new command_1.default(message.content.substr(this.commandPrefix.length)));
            }
        }
    }
    // Accessors -----------------------------------------------------------------------------------
    /**
     * Get the command registrar
     */
    get commandRegistrar() {
        return this.__registrar;
    }
}
exports.default = DiscordCommander;
//# sourceMappingURL=discord_commander.js.map