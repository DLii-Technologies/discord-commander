import { Client, Message } from "discord.js";
import CommandRegistrar from "./command_registrar";
declare class DiscordCommander extends Client {
    /**
     * The command prefix
     */
    commandPrefix: string;
    /**
     * The Registrar stores each of the registered command modules
     */
    private __registrar;
    /**
     * The client ID for the Discord bot
     */
    private __clientId;
    /**
     * Create a new DiscordCommander Discord bot
     */
    constructor(clientId: string);
    /**
     * Register the event listeners
     */
    protected registerListeners(): void;
    /**
     * Start the bot
     */
    boot(): void;
    /**
     * Invoked when a message is received from Discord
     */
    protected onMessage(message: Message): void;
    /**
     * Get the command registrar
     */
    readonly commandRegistrar: CommandRegistrar;
}
export default DiscordCommander;
