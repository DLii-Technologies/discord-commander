"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandInvocation {
    /**
     * Create a new command instance
     */
    constructor(prefix, commandString, member) {
        /**
         * Store the raw argument string
         */
        this.__argString = "";
        /**
         * The validity of the command state
         */
        this.__isValid = true;
        /**
         * The name of the command invoked
         */
        this.__name = "";
        this.__commandString = commandString.trim();
        this.__member = member;
        this.evaluate(prefix);
    }
    /**
     * Evaluate the command string given the command prefix
     */
    evaluate(prefix) {
        var command = this.__commandString.split(" ")[0];
        if (command.startsWith(prefix) && command.length > prefix.length) {
            var name = command.substr(prefix.length);
            this.__name = command.substr(prefix.length);
            this.__argString = this.__commandString.substr(command.length).trim();
        }
        else {
            this.__isValid = false;
        }
    }
    /**
     * Get the argument string
     */
    get argString() {
        return this.__argString;
    }
    /**
     * Get the original command string
     */
    get commandString() {
        return this.__argString;
    }
    /**
     * Check if the command is in a valid state
     */
    get isValid() {
        return this.__isValid;
    }
    /**
     * Get the name of the command
     */
    get name() {
        return this.__name;
    }
}
exports.default = CommandInvocation;
//# sourceMappingURL=command_invocation.js.map