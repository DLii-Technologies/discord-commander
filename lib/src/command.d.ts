import CommandInvocation from "./command_invocation";
import Authorization from "./authorization";
import { CommandCallback } from "./common";
declare class Command {
    /**
     * Authorization models
     */
    private __authorization;
    /**
     * The callback function/method
     */
    private __run;
    /**
     * The context of the callback
     */
    private __context;
    /**
     * The name of the command
     */
    private __name;
    /**
     * Create a new command
     */
    constructor(name: string, auth: Authorization[], callback: CommandCallback | undefined, context?: any);
    /**
     * Run the command
     */
    run(invocation: CommandInvocation): void;
    /**
     * Authorize the invocation
     */
    protected authorize(invocation: CommandInvocation): boolean;
    /**
     * Invoke the command
     */
    invoke(invocation: CommandInvocation): any;
}
export default Command;
