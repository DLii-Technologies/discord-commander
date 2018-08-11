import { Client, Message }             from "discord.js";
import { CommandMap, CommandCallback } from "./interfaces/command_map";
import Command                         from "./command";
import EventMap                        from "./interfaces/event_map";

class DiscordCommander
{
	/**
	 * A list of all the events to listen for
	 */
	protected events: EventMap = {
		message: this.onMessage
	};

	/**
	 * Store any active listeners
	 */
	protected eventListeners: EventMap = {};

	/**
	 * An instance of the Discord bot client
	 */
	private __bot: Client | undefined = undefined;

	/**
	 * The list of registered commands
	 */
	private __commands: CommandMap = {};

	/**
	 * The command prefix
	 */
	private __prefix: string = '!';

	/**
	 * Create a new DiscordCommander
	 */
	public constructor (bot?: Client) {
		this.bot = bot;
	}

	/**
	 * Invoke the given command
	 */
	protected invoke (command: Command) {
		this.__commands[command.name](command);
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

	/**
	 * Register a command
	 */
	protected registerCommand (name: string, callback: CommandCallback, context?: any) {
		if (this.has(name))
			throw new Error(`Command Registration Error: '${name}' has already been registered`);
		if (context) {
			this.__commands[name] = (...args: any[]) => {

				callback.apply(context, args);
			};
		} else {
			this.__commands[name] = callback;
		}
	}

	/**
	 * Unregister a command
	 */
	protected unregisterCommand (name: string, callback: CommandCallback) {
		if (this.has(name)) {
			delete this.__commands[name];
		}
	}

	// Public Methods ------------------------------------------------------------------------------

	/**
	 * Check if the command has been registered
	 */
	public has (name: string) {
		return Boolean(this.__commands[name]);
	}

	/**
	 * Register multiple commands at a time using a Commandmap
	 */
	public register (map: CommandMap): DiscordCommander;

	/**
	 * Register a single command given the name and callback
	 */
	public register (name: string, callback: CommandCallback, context?: any): DiscordCommander;

	/**
	 * Register a command
	 */
	public register (a: CommandMap | string, b?: CommandCallback, context?: any) {
		if (typeof a == "string") {
			if (!b)
				throw new Error(`Command Registration Error: '${a}' has no callback`);
			this.registerCommand(a, b, context);
		} else {
			for (let name in a) {
				this.registerCommand(name, a[name]);
			}
		}
		return this;
	}

	/**
	 * Register multiple commands at a time using a Commandmap
	 */
	public unregister (map: CommandMap): DiscordCommander;

	/**
	 * Register a single command given the name and callback
	 */
	public unregister (name: string, callback: CommandCallback): DiscordCommander;

	/**
	 * Register a command
	 */
	public unregister (a: CommandMap | string, b?: CommandCallback) {
		if (typeof a == "string") {
			if (!b)
				throw new Error(`Command Registration Error: '${a}' has no callback`);
			this.unregisterCommand(a, b);
		} else {
			for (let name in a) {
				this.unregisterCommand(name, a[name]);
			}
		}
		return this;
	}

	// Event Handlers ------------------------------------------------------------------------------

	/**
	 * Invoked when a message is received from Discord
	 */
	protected onMessage (message: Message) {
		if (message.content.startsWith(this.prefix)) {
			var cmd = new Command(this.prefix, message.content);
			if (cmd.isValid) {
				this.invoke(cmd);
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
