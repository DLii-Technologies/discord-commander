import { GuildMember } from "discord.js";
declare class CommandInvocation {
    /**
     * Store the raw argument string
     */
    private __argString;
    /**
     * Store the original command string
     */
    private __commandString;
    /**
     * The validity of the command state
     */
    private __isValid;
    /**
     * The name of the command invoked
     */
    private __name;
    /**
     * The member who created the invocation
     */
    private __member;
    /**
     * Create a new command instance
     */
    constructor(prefix: string, commandString: string, member: GuildMember);
    /**
     * Evaluate the command string given the command prefix
     */
    protected evaluate(prefix: string): void;
    /**
     * Get the argument string
     */
    readonly argString: string;
    /**
     * Get the original command string
     */
    readonly commandString: string;
    /**
     * Check if the command is in a valid state
     */
    readonly isValid: boolean;
    /**
     * Get the name of the command
     */
    readonly name: string;
}
export default CommandInvocation;
