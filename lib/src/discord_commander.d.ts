import { Client, Message } from "discord.js";
import EventMap from "./interfaces/event_map";
declare class DiscordCommander {
    /**
     * The command prefix
     */
    commandPrefix: string;
    /**
     * A list of all the events to listen for
     */
    protected events: EventMap;
    /**
     * An instance of the Discord bot client
     */
    private __bot;
    /**
     * Create a new DiscordCommander
     */
    constructor(bot: Client | null);
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
    bot: Client | null;
}
export default DiscordCommander;
