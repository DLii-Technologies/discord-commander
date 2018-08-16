/// <reference path="../../node_modules/discord.js/typings/index.d.ts" />
import { Message } from "discord.js";
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
     * The name of the command invoked
     */
    private __name;
    /**
     * The member who created the invocation
     */
    private __message;
    /**
     * Create a new command instance
     */
    constructor(prefix: string, message: Message);
    /**
     * Evaluate the command string given the command prefix
     */
    protected evaluate(prefix: string): void;
    /**
     * Check if the user has the given role(s)
     */
    hasRole(...roles: string[]): boolean;
    /**
     * Get the argument string
     */
    readonly argString: string;
    /**
     * Get the channel where the invocation was requested
     */
    readonly channel: import("discord.js").GroupDMChannel | import("discord.js").DMChannel | import("discord.js").TextChannel;
    /**
     * Get the original command string
     */
    readonly commandString: string;
    /**
     * Get the name of the command
     */
    readonly command: string;
    /**
     * Get the raw Discord Message object
     */
    readonly message: Message;
    /**
     * Get the roles the user has
     */
    readonly roles: import("discord.js").Collection<string, import("discord.js").Role>;
    /**
     * Get the user ID
     */
    readonly user: import("discord.js").GuildMember;
}
export default CommandInvocation;
