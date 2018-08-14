import { GuildMember, Message } from "discord.js";

class CommandInvocation
{
	/**
	 * Store the raw argument string
	 */
	private __argString: string = "";

	/**
	 * Store the original command string
	 */
	private __commandString: string;

	/**
	 * The validity of the command state
	 */
	private __isValid: boolean = true;

	/**
	 * The name of the command invoked
	 */
	private __name: string = "";

	/**
	 * The member who created the invocation
	 */
	private __member: GuildMember;

	/**
	 * Create a new command instance
	 */
	constructor (prefix: string, message: Message) {
		this.__commandString = message.content.trim();
		this.__member        = message.member;
		this.evaluate(prefix);
	}

	/**
	 * Evaluate the command string given the command prefix
	 */
	protected evaluate (prefix: string) {
		var command: string = this.__commandString.split(" ")[0];
		if (command.startsWith(prefix) && command.length > prefix.length) {
			var name: string = command.substr(prefix.length);
			this.__name      = command.substr(prefix.length);
			this.__argString = this.__commandString.substr(command.length).trim();
		} else {
			this.__isValid = false;
		}
	}

	/**
	 * Get the argument string
	 */
	public get argString () {
		return this.__argString;
	}

	/**
	 * Get the original command string
	 */
	public get commandString () {
		return this.__argString;
	}

	/**
	 * Check if the command is in a valid state
	 */
	public get isValid () {
		return this.__isValid;
	}

	/**
	 * Get the name of the command
	 */
	public get name () {
		return this.__name;
	}
}

export default CommandInvocation;
