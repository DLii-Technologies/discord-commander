import { Client, Message } from "discord.js";
import CommandManager from "./command_manager";
import { IEventMap } from "./common";
declare class DiscordCommander extends CommandManager {
    /**
     * A list of all the events to listen for
     */
    protected events: IEventMap;
    /**
     * Store any active listeners
     */
    protected eventListeners: IEventMap;
    /**
     * An instance of the Discord bot client
     */
    private __bot;
    /**
     * Create a new DiscordCommander
     */
    constructor(bot?: Client);
    /**
     * Register the event listeners
     */
    protected registerListeners(): void;
    /**
     * Unregister the event listeners
     */
    protected unregisterListeners(): void;
    /**
     * Invoked when a message is received from Discord
     */
    protected onMessage(message: Message): void;
    /**
     * Get the current Discord bot client instance
     */
    /**
    * Set the current Discord bot client instance
    */
    bot: Client | undefined;
}
export default DiscordCommander;
