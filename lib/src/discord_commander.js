"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const command_invocation_1 = __importDefault(require("./command_invocation"));
const registrar_1 = __importDefault(require("./registrar"));
const error_1 = require("./error");
/**
 * A Discord bot with a command handler built in
 */
class DiscordCommander extends discord_js_1.Client {
    /**
     * Create a new DiscordCommander
     */
    constructor() {
        super();
        /**
         * A list of all the events to listen for
         */
        this.events = {
            message: this.onMessage
        };
        /**
         * Store all registered commands
         */
        this.__commands = {};
        /**
         * The prefix for commands
         */
        this.__prefix = '!';
        this.registerListeners();
    }
    /**
     * Register the event listeners
     */
    registerListeners() {
        for (var event in this.events) {
            this.on(event, (...args) => {
                this.events[event].apply(this, args);
            });
        }
    }
    // Public Methods ------------------------------------------------------------------------------
    /**
     * Check if a command is defined
     */
    has(name) {
        return Boolean(this.__commands[name]);
    }
    /**
     * Invoke a command with the given arguments
     */
    invoke(invocation) {
        if (this.has(invocation.command)) {
            this.__commands[invocation.command].invoke(invocation);
        }
    }
    /**
     * Register some new commands
     */
    register(callback, context) {
        callback(new registrar_1.default(this.__commands, context));
    }
    // Event Handlers ------------------------------------------------------------------------------
    /**
     * Handle a command message
     */
    handle(message) {
        var invocation = new command_invocation_1.default(this.prefix, message);
        this.invoke(invocation);
    }
    /**
     * Invoked when a message is received from Discord
     */
    onMessage(message) {
        if (message.content.startsWith(this.prefix)) {
            try {
                this.handle(message);
            }
            catch (e) {
                if (e instanceof error_1.CommandInvocationError) {
                    console.error(e);
                }
            }
        }
    }
    // Properties ----------------------------------------------------------------------------------
    /**
     * Get the command prefix
     */
    get prefix() {
        return this.__prefix;
    }
    /**
     * Set the command prefix
     */
    set prefix(prefix) {
        prefix = prefix.trim();
        if (prefix.length == 0)
            throw new Error("Set Command Prefix Error: Prefix cannot be empty");
        this.__prefix = prefix;
    }
}
exports.default = DiscordCommander;
//# sourceMappingURL=discord_commander.js.map