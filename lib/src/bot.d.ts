import { Client, Message } from "discord.js";
import CommandInvocation from "./command_invocation";
import * as Common from "./common";
/**
 * A Discord bot with a command handler built in
 */
declare class Bot extends Client {
    /**
     * A list of all the events to listen for
     */
    protected events: Common.IEventMap;
    /**
     * Store all registered commands
     */
    __commands: Common.ICommandMap;
    /**
     * The prefix for commands
     */
    __prefix: string;
    /**
     * Create a new DiscordCommander
     */
    constructor();
    /**
     * Register the event listeners
     */
    protected registerListeners(): void;
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
    register(callback: Common.RegistrationCallback, context?: any): void;
    /**
     * Handle a command message
     */
    protected handle(message: Message): void;
    /**
     * Invoked when a message is received from Discord
     */
    protected onMessage(message: Message): void;
    /**
     * Get the command prefix
     */
    /**
    * Set the command prefix
    */
    prefix: string;
}
export default Bot;
