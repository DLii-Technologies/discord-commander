"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The class keeps track of all commands
 */
class CommandRegistrar {
    /**
     * Create a new command registrar
     */
    constructor() {
        this.__commands = {};
    }
    /**
     * Fetch the given command
     */
    fetch(name) {
        return this.__commands[name];
    }
    /**
     * Check if the command exists
     */
    has(name) {
        return Boolean(this.__commands[name]);
    }
    /**
     * Invoke the given command
     */
    invoke(command) {
        console.log("Invoking the method...");
        if (!this.has(command.name))
            throw new Error(`Command Invocation Error: '${command.name}' not found`);
        this.__commands[command.name](command);
        return this;
    }
    /**
     * Register a new command
     */
    register(name, callback) {
        if (this.has(name))
            throw new Error(`Command Registration Error: '${name}' has already been registered`);
        this.__commands[name] = callback;
        return this;
    }
    /**
     * Register a set of commands at once
     */
    registerAll(commands) {
        for (var name in commands)
            this.register(name, commands[name]);
        return this;
    }
}
exports.default = CommandRegistrar;
//# sourceMappingURL=command_registrar.js.map