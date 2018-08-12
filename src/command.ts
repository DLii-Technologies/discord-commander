import CommandInvocation   from "./command_invocation";
import { CommandCallback } from "./common";

class Command
{
	/**
	 * The callback function/method
	 */
	__callback: CommandCallback;

	/**
	 * The context of the callback
	 */
	__context: any;

	/**
	 * The name of the command
	 */
	__name: string;

	/**
	 * Create a new command
	 */
	constructor (name: string, callback: CommandCallback, context?: any) {
		this.__name     = name;
		this.__callback = callback;
		this.__context  = context || callback;
	}

	/**
	 * Invoke the command
	 */
	public invoke (args: CommandInvocation) {
		this.__callback.apply(args, this.__context);
	}
}

export default Command;
