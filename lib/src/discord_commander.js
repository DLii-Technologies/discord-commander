"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DiscordCommander {
    /**
     * Create a new DiscordCommander
     */
    constructor(bot) {
        /**
         * The command prefix
         */
        this.commandPrefix = '!';
        /**
         * A list of all the events to listen for
         */
        this.events = {
            "message": this.onMessage
        };
        /**
         * An instance of the Discord bot client
         */
        this.__bot = null;
        this.bot = bot;
    }
    /**
     * Register the event listeners
     */
    registerListeners() {
        if (this.bot) {
            for (var event in this.events) {
                this.bot.on(event, this.events[event]);
            }
        }
    }
    /**
     * Unregister the event listeners
     */
    unregisterListeners() {
        if (this.bot) {
            for (var event in this.events) {
                this.bot.off(event, this.events[event]);
            }
        }
    }
    // Event Handlers ------------------------------------------------------------------------------
    /**
     * Invoked when a message is received from Discord
     */
    onMessage(message) {
        var name = message.content.split(' ')[0];
        if (name.startsWith(this.commandPrefix) && name.length > this.commandPrefix.length) {
            // Shave off the prefix
            // if (this.__registrar.has(name.substr(this.commandPrefix.length))) {
            // 	this.__registrar.invoke(
            // 		new Command(message.content.substr(this.commandPrefix.length))
            // 	);
            // }
        }
    }
    // Properties ----------------------------------------------------------------------------------
    /**
     * Get the current Discord bot client instance
     */
    get bot() {
        return this.__bot;
    }
    /**
     * Set the current Discord bot client instance
     */
    set bot(bot) {
        this.unregisterListeners();
        this.__bot = bot;
        this.registerListeners();
    }
}
exports.default = DiscordCommander;
//# sourceMappingURL=discord_commander.js.map