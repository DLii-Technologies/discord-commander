import * as Common from "./common";
/**
 * A simple command registration system
 */
declare class CommandRegistrar {
    /**
     * The context of the commands to register
     */
    __context: any;
    /**
     * The list of registered commands
     */
    private __commands;
    /**
     * Create a new registrar
     */
    constructor(commands: Common.ICommandMap, context: any);
    /**
     * Register a command
     */
    protected registerCommand(name: string, callback?: Common.CommandCallback, context?: any): void;
    /**
     * Register a set of commands
     */
    protected registerCommands(commands: Common.ICommandDefinitions, context?: any): void;
    /**
     * Register the commands within a module
     */
    protected registerModule(commandModule: Common.ICommandRegistrar): void;
    /**
     * Register a list of modules
     */
    protected registerModules(commandModules: Common.ICommandRegistrar[]): void;
    /**
     * Register a command module
     */
    register(module: Common.ICommandRegistrar): CommandRegistrar;
    /**
     * Register a list of command modules
     */
    register(modules: Common.ICommandRegistrar[]): CommandRegistrar;
    /**
     * Register multiple commands at a time using a Commandmap
     */
    register(map: Common.ICommandDefinitions, context?: any): CommandRegistrar;
    /**
     * Register a single command given the name and callback
     */
    register(name: string, callback: Common.CommandCallback, context?: any): CommandRegistrar;
}
export default CommandRegistrar;
