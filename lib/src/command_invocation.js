"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
class CommandInvocation {
    /**
     * Create a new command instance
     */
    constructor(prefix, message) {
        /**
         * Store the raw argument string
         */
        this.__argString = "";
        /**
         * The name of the command invoked
         */
        this.__name = "";
        this.__commandString = message.content.trim();
        this.__message = message;
        this.evaluate(prefix);
    }
    /**
     * Evaluate the command string given the command prefix
     */
    evaluate(prefix) {
        var command = this.__commandString.split(" ")[0];
        if (command.startsWith(prefix) && command.length > prefix.length) {
            this.__name = command.substr(prefix.length);
            this.__argString = this.__commandString.substr(command.length).trim();
        }
        else {
            throw new error_1.CommandInvocationError("Command evaluation error");
        }
    }
    // Public Methods ------------------------------------------------------------------------------
    /**
     * Check if the user has the given role(s)
     */
    hasRole(...roles) {
        for (var i in roles) {
            if (!this.__message.member.roles.has(roles[i])) {
                return false;
            }
        }
        return true;
    }
    // Properties ----------------------------------------------------------------------------------
    /**
     * Get the argument string
     */
    get argString() {
        return this.__argString;
    }
    /**
     * Get the channel where the invocation was requested
     */
    get channel() {
        return this.__message.channel;
    }
    /**
     * Get the original command string
     */
    get commandString() {
        return this.__argString;
    }
    /**
     * Get the name of the command
     */
    get command() {
        return this.__name;
    }
    /**
     * Get the raw Discord Message object
     */
    get message() {
        return this.__message;
    }
    /**
     * Get the roles the user has
     */
    get roles() {
        return this.__message.member.roles;
    }
    /**
     * Get the user ID
     */
    get user() {
        return this.__message.member;
    }
}
exports.default = CommandInvocation;
//# sourceMappingURL=command_invocation.js.map