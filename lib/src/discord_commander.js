"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_invocation_1 = __importDefault(require("./command_invocation"));
const command_manager_1 = __importDefault(require("./command_manager"));
class DiscordCommander extends command_manager_1.default {
    /**
     * Create a new DiscordCommander
     */
    constructor(bot) {
        super();
        /**
         * A list of all the events to listen for
         */
        this.events = {
            message: this.onMessage
        };
        /**
         * Store any active listeners
         */
        this.eventListeners = {};
        /**
         * An instance of the Discord bot client
         */
        this.__bot = undefined;
        this.bot = bot;
    }
    /**
     * Register the event listeners
     */
    registerListeners() {
        if (this.bot) {
            for (var event in this.events) {
                this.eventListeners[event] = (...args) => {
                    this.events[event].apply(this, args);
                };
                this.bot.on(event, this.eventListeners[event]);
            }
        }
    }
    /**
     * Unregister the event listeners
     */
    unregisterListeners() {
        if (this.bot) {
            for (var event in this.events) {
                this.bot.off(event, this.eventListeners[event]);
                delete this.eventListeners[event];
            }
        }
    }
    // Event Handlers ------------------------------------------------------------------------------
    /**
     * Invoked when a message is received from Discord
     */
    onMessage(message) {
        if (message.content.startsWith(this.prefix)) {
            var invocation = new command_invocation_1.default(this.prefix, message.content, message.member);
            if (invocation.isValid) {
                this.invoke(invocation);
            }
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