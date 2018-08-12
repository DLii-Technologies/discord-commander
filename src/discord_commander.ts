import { Client, Message } from "discord.js";
import CommandInvocation   from "./command_invocation";
import CommandManager      from "./command_manager";
import { IEventMap }       from "./common";

class DiscordCommander extends CommandManager
{
	/**
	 * A list of all the events to listen for
	 */
	protected events: IEventMap = {
		message: this.onMessage
	};

	/**
	 * Store any active listeners
	 */
	protected eventListeners: IEventMap = {};

	/**
	 * An instance of the Discord bot client
	 */
	private __bot: Client | undefined = undefined;

	/**
	 * Create a new DiscordCommander
	 */
	public constructor (bot?: Client) {
		super();
		this.bot = bot;
	}

	/**
	 * Register the event listeners
	 */
	protected registerListeners () {
		if (this.bot) {
			for (var event in this.events) {
				this.eventListeners[event] = (...args: any[]) => {
					this.events[event].apply(this, args);
				}
				this.bot.on(event, this.eventListeners[event]);
			}
		}
	}

	/**
	 * Unregister the event listeners
	 */
	protected unregisterListeners () {
		if (this.bot) {
			for (var event in this.events) {
				this.bot.off(event, this.eventListeners[event]);
				delete this.eventListeners[event];
			}
		}
	}

	// Event Handlers ------------------------------------------------------------------------------

	/**
	 * Invoked when a message is received from Discord
	 */
	protected onMessage (message: Message) {
		if (message.content.startsWith(this.prefix)) {
			var invocation = new CommandInvocation(this.prefix, message.content, message.member);
			if (invocation.isValid) {
				this.invoke(invocation);
			}
		}
	}

	// Properties ----------------------------------------------------------------------------------

	/**
	 * Get the current Discord bot client instance
	 */
	public get bot () {
		return this.__bot;
	}

	/**
	 * Set the current Discord bot client instance
	 */
	public set bot (bot: Client | undefined) {
		this.unregisterListeners();
		this.__bot = bot;
		this.registerListeners();
	}
}

export default DiscordCommander;
