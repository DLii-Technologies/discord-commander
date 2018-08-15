import { Message }                from "discord.js";
import { CommandInvocationError } from "./error";

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
	 * The name of the command invoked
	 */
	private __name: string = "";

	/**
	 * The member who created the invocation
	 */
	private __message: Message;

	/**
	 * Create a new command instance
	 */
	constructor (prefix: string, message: Message) {
		this.__commandString = message.content.trim();
		this.__message       = message;
		this.evaluate(prefix);
	}

	/**
	 * Evaluate the command string given the command prefix
	 */
	protected evaluate (prefix: string) {
		var command: string = this.__commandString.split(" ")[0];
		if (command.startsWith(prefix) && command.length > prefix.length) {
			this.__name      = command.substr(prefix.length);
			this.__argString = this.__commandString.substr(command.length).trim();
		} else {
			throw new CommandInvocationError("Command evaluation error");
		}
	}

	// Public Methods ------------------------------------------------------------------------------

	/**
	 * Check if the user has the given role(s)
	 */
	public hasRole (...roles: string[]) {
		for (var i in roles) {
			if (!this.__message.member.roles.has(roles[i])) {
				return false;
			}
		}
		return true;
	}

	// Properties ----------------------------------------------------------------------------------

	/**
	 * Get the argument string
	 */
	public get argString () {
		return this.__argString;
	}

	/**
	 * Get the channel where the invocation was requested
	 */
	public get channel () {
		return this.__message.channel;
	}

	/**
	 * Get the original command string
	 */
	public get commandString () {
		return this.__argString;
	}

	/**
	 * Get the name of the command
	 */
	public get command () {
		return this.__name;
	}

	/**
	 * Get the raw Discord Message object
	 */
	public get rawMessage () {
		return this.__message;
	}

	/**
	 * Get the roles the user has
	 */
	public get roles () {
		return this.__message.member.roles;
	}

	/**
	 * Get the user ID
	 */
	public get user () {
		return this.__message.member;
	}
}

export default CommandInvocation;
