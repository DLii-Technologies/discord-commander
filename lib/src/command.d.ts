import CommandInvocation from "./command_invocation";
import { CommandCallback } from "./common";
declare class Command {
    /**
     * The callback function/method
     */
    __callback: CommandCallback;
    /**
     * The context of the callback
     */
    __context: any;
    /**
     * The name of the command
     */
    __name: string;
    /**
     * Create a new command
     */
    constructor(name: string, callback: CommandCallback, context?: any);
    /**
     * Invoke the command
     */
    invoke(args: CommandInvocation): void;
}
export default Command;
