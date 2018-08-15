import Authorization from "./authorization";
import { AuthorizationCallback, CommandCallback, ICommandMap, ICommandDefinitions, ICommandRegistrar, RegistrationCallback } from "./common";
/**
 * A simple command registration system
 */
declare class Registrar {
    /**
     * The required authorization to register the commands with
     */
    private __authorization;
    /**
     * The context of the commands to register
     */
    private __context;
    /**
     * The list of registered commands
     */
    private __commands;
    /**
     * Create a new registrar
     */
    constructor(commands: ICommandMap, context: any, authorization?: Authorization[]);
    /**
     * Register a command
     */
    protected registerCommand(name: string, callback?: CommandCallback, context?: any): void;
    /**
     * Register a set of commands
     */
    protected registerCommands(commands: ICommandDefinitions, context?: any): void;
    /**
     * Register the commands within a module
     */
    protected registerModule(commandModule: ICommandRegistrar): void;
    /**
     * Register a list of modules
     */
    protected registerModules(commandModules: ICommandRegistrar[]): void;
    /**
     * Require a standard callback function to authorize the commands
     */
    authorize(auth: AuthorizationCallback, callback: RegistrationCallback): Registrar;
    /**
     * Requrie an authorization module for the commands
     */
    authorize(auth: Authorization, callback: RegistrationCallback): Registrar;
    /**
     * Require multiple authorization modules for the commands
     */
    authorize(auth: Authorization[], callback: RegistrationCallback): Registrar;
    /**
     * Register a command module
     */
    register(module: ICommandRegistrar): Registrar;
    /**
     * Register a list of command modules
     */
    register(modules: ICommandRegistrar[]): Registrar;
    /**
     * Register multiple commands at a time using a Commandmap
     */
    register(map: ICommandDefinitions, context?: any): Registrar;
    /**
     * Register a single command given the name and callback
     */
    register(name: string, callback: CommandCallback, context?: any): Registrar;
}
export default Registrar;
