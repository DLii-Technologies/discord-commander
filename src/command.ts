import CommandInvocation   from "./command_invocation";
import { CommandCallback } from "./common";

class Command
{
	/**
	 * The callback function/method
	 */
	__callback: CommandCallback | undefined;

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
	constructor (name: string, callback: CommandCallback | undefined, context?: any) {
		this.__name     = name;
		this.__callback = callback;
		this.__context  = context || callback;
	}

	// Overridable ---------------------------------------------------------------------------------

	/**
	 * Determine if the command invocation is authorized
	 */
	public authorize (invocation: CommandInvocation): boolean {
		return true;
	}

	// Public Methods ------------------------------------------------------------------------------

	/**
	 * Invoke the command
	 */
	public invoke (invocation: CommandInvocation): boolean {
		if (this.__callback)
			return this.__callback.apply(invocation, this.__context);
		return true;
	}

	/**
	 * Check if the command invocation is authorized
	 */
	public isAuthorized (invocation: CommandInvocation) {

	}
}

export default Command;
