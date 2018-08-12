"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __importDefault(require("./command"));
const Common = __importStar(require("./common"));
/**
 * A simple command registration system
 */
class CommandRegistrar {
    /**
     * Create a new registrar
     */
    constructor(commands, context) {
        this.__commands = commands;
        this.__context = context;
    }
    /**
     * Register a command
     */
    registerCommand(name, callback, context) {
        if (!callback)
            throw new Error(`Command Registration Error: '${name}' has no callback`);
        if (this.__commands[name])
            throw new Error(`Command Registration Error: '${name}' has already been registered`);
        this.__commands[name] = new command_1.default(name, callback, context || this.__context);
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
        var registrar = new CommandRegistrar(this.__commands, commandModule);
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
     * Register a command
     */
    register(a, b, context) {
        if (typeof a == "string") {
            this.registerCommand(a, b, context);
        }
        else if (Array.isArray(a)) {
            this.registerModules(a);
        }
        else if (Common.isCommandRegistrar(a)) {
            this.registerModule(a);
        }
        else {
            this.registerCommands(a, b);
        }
        return this;
    }
}
exports.default = CommandRegistrar;
//# sourceMappingURL=command_registrar.js.map