import { Client, Message }        from "discord.js";
import CommandInvocation          from "./command_invocation";
import Registrar                  from "./registrar";
import { CommandInvocationError } from "./error";
import * as Common                from "./common";

/**
 * A Discord bot with a command handler built in
 */
class Bot extends Client
{
	/**
	 * A list of all the events to listen for
	 */
	protected events: Common.IEventMap = {
		message: this.onMessage
	};

	/**
	 * Store all registered commands
	 */
	__commands: Common.ICommandMap = {};

	/**
	 * The prefix for commands
	 */
	__prefix = '!';

	/**
	 * Create a new DiscordCommander
	 */
	public constructor () {
		super();
		this.registerListeners();
	}

	/**
	 * Register the event listeners
	 */
	protected registerListeners () {
		for (var event in this.events) {
			this.on(event, (...args: any[]) => {
				this.events[event].apply(this, args);
			});
		}
	}

	// Public Methods ------------------------------------------------------------------------------

	/**
	 * Check if a command is defined
	 */
	public has (name: string) {
		return Boolean(this.__commands[name]);
	}

	/**
	 * Invoke a command with the given arguments
	 */
	public invoke (invocation: CommandInvocation) {
		if (this.has(invocation.command)) {
			this.__commands[invocation.command].invoke(invocation);
		}
	}

	/**
	 * Register some new commands
	 */
	public register (callback: Common.RegistrationCallback, context?: any) {
		callback(new Registrar(this.__commands, context));
	}

	// Event Handlers ------------------------------------------------------------------------------

	/**
	 * Handle a command message
	 */
	protected handle (message: Message) {
		var invocation = new CommandInvocation(this.prefix, message);
		this.invoke(invocation);
	}

	/**
	 * Invoked when a message is received from Discord
	 */
	protected onMessage (message: Message) {
		if (message.content.startsWith(this.prefix)) {
			try {
				this.handle(message);
			} catch (e) {
				console.error(e);
			}
		}
	}

	// Properties ----------------------------------------------------------------------------------

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

export default Bot;
