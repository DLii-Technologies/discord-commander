"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authorization_1 = __importDefault(require("./authorization"));
const command_1 = __importDefault(require("./command"));
const error_1 = require("./error");
const common_1 = require("./common");
/**
 * A simple command registration system
 */
class Registrar {
    /**
     * Create a new registrar
     */
    constructor(commands, context, authorization) {
        /**
         * The required authorization to register the commands with
         */
        this.__authorization = [];
        this.__commands = commands;
        this.__context = context;
        this.__authorization = authorization || [];
    }
    /**
     * Register a command
     */
    registerCommand(name, callback, context) {
        if (!callback)
            throw new error_1.CommandRegistrationError(`'${name}' has no callback`);
        if (this.__commands[name])
            throw new error_1.CommandRegistrationError(`'${name}' has already been registered`);
        this.__commands[name] = new command_1.default(name, this.__authorization, callback, context || this.__context);
    }
    /**
     * Register a set of commands
     */
    registerCommands(commands, context) {
        for (var name in commands) {
            this.registerCommand(name, commands[name], context);
        }
    }
    /**
     * Register the commands within a module
     */
    registerModule(commandModule) {
        var registrar = new Registrar(this.__commands, commandModule);
        commandModule.register(registrar);
    }
    /**
     * Register a list of modules
     */
    registerModules(commandModules) {
        commandModules.forEach((module) => {
            this.registerModule(module);
        });
    }
    /**
     * Require authorization for commands
     */
    authorize(auth, callback) {
        var authorization;
        if (Array.isArray(auth)) {
            authorization = auth;
        }
        else if (auth instanceof authorization_1.default) {
            authorization = [auth];
        }
        else {
            authorization = [new authorization_1.default(auth)];
        }
        callback(new Registrar(this.__commands, this.__context, this.__authorization.concat(authorization)));
        return this;
    }
    /**
     * Register a command
     */
    register(a, b, context) {
        if (typeof a == "string") {
            this.registerCommand(a, b, context);
        }
        else if (Array.isArray(a)) {
            this.registerModules(a);
        }
        else if (common_1.isCommandRegistrar(a)) {
            this.registerModule(a);
        }
        else {
            this.registerCommands(a, b);
        }
        return this;
    }
}
exports.default = Registrar;
//# sourceMappingURL=registrar.js.map