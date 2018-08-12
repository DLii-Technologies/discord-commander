import { Client, Message } from "discord.js";
import CommandArgs         from "./command_args";
import CommandRegistrar    from "./command_registrar";
import { IEventMap }       from "./common";

class DiscordCommander
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
	 * The command prefix
	 */
	private __prefix: string = '!';

	/**
	 * The list of registered commands
	 */
	private __registrar: CommandRegistrar;

	/**
	 * Create a new DiscordCommander
	 */
	public constructor (bot?: Client) {
		this.__registrar = new CommandRegistrar();
		this.bot         = bot;
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

	// Public Methods ------------------------------------------------------------------------------

	/**
	 * Invoke a command with the given arguments
	 */
	public invoke (args: CommandArgs) {
		var cmd = this.__registrar.fetch(args.name);
		if (cmd) {
			cmd.invoke(args);
		}
	}

	/**
	 * Check if the command has been registered
	 */
	public has (name: string) {
		return this.__registrar.has(name);
	}

	/**
	 * Register a set of commands by using the given command registrar
	 */
	public register (callback: (registrar: CommandRegistrar) => void, context?: any) {
		this.__registrar.context = context;
		callback(this.__registrar);
		this.__registrar.context = undefined;
	}

	// Event Handlers ------------------------------------------------------------------------------

	/**
	 * Invoked when a message is received from Discord
	 */
	protected onMessage (message: Message) {
		if (message.content.startsWith(this.prefix)) {
			var args = new CommandArgs(this.prefix, message.content);
			if (args.isValid) {
				this.invoke(args);
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

	/**
	 * Get the command prefix
	 */
	public get prefix () {
		return this.__prefix;
	}

	/**
	 * Set the command prefix
	 */
	public set prefix (prefix: string) {
		prefix = prefix.trim();
		if (prefix.length == 0)
			throw new Error("Set Command Prefix Error: Prefix cannot be empty");
		this.__prefix = prefix;
	}
}

export default DiscordCommander;
