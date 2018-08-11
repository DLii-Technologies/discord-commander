import CommandMap from "./interfaces/command_map";
import Command from "./command";
/**
 * The class keeps track of all commands
 */
declare class CommandRegistrar {
    /**
     * The list of commands
     */
    __commands: CommandMap;
    /**
     * Create a new command registrar
     */
    constructor();
    /**
     * Fetch the given command
     */
    fetch(name: string): Function;
    /**
     * Check if the command exists
     */
    has(name: string): boolean;
    /**
     * Invoke the given command
     */
    invoke(command: Command): CommandRegistrar;
    /**
     * Register a new command
     */
    register(name: string, callback: Function): CommandRegistrar;
    /**
     * Register a set of commands at once
     */
    registerAll(commands: CommandMap): CommandRegistrar;
}
export default CommandRegistrar;
