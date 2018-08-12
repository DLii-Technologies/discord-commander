"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_registrar_1 = __importDefault(require("./command_registrar"));
class CommandManager {
    constructor() {
        /**
         * Store all available commands
         */
        this.__commands = {};
        /**
         * The prefix for commands
         */
        this.__prefix = '!';
    }
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
        if (this.has(invocation.name)) {
            this.__commands[invocation.name].invoke(invocation);
        }
    }
    /**
     * Register some new commands
     */
    register(callback, context) {
        var registrar = new command_registrar_1.default(this.__commands, context);
        callback(registrar);
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
exports.default = CommandManager;
//# sourceMappingURL=command_manager.js.map