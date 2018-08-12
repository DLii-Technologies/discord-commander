import { ICommandMap, RegistrationCallback } from "./common";
import CommandInvocation from "./command_invocation";
declare class CommandManager {
    /**
     * Store all available commands
     */
    __commands: ICommandMap;
    /**
     * The prefix for commands
     */
    __prefix: string;
    /**
     * Check if a command is defined
     */
    has(name: string): boolean;
    /**
     * Invoke a command with the given arguments
     */
    invoke(invocation: CommandInvocation): void;
    /**
     * Register some new commands
     */
    register(callback: RegistrationCallback, context?: any): void;
    /**
     * Get the command prefix
     */
    /**
    * Set the command prefix
    */
    prefix: string;
}
export default CommandManager;
