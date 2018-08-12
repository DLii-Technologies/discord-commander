import {
	ICommandMap,
	RegistrationCallback
}                        from "./common";
import CommandInvocation from "./command_invocation";
import CommandRegistrar  from "./command_registrar";

class CommandManager
{
	/**
	 * Store all available commands
	 */
	__commands: ICommandMap = {};

	/**
	 * The prefix for commands
	 */
	__prefix = '!';

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
		if (this.has(invocation.name)) {
			this.__commands[invocation.name].invoke(invocation);
		}
	}

	/**
	 * Register some new commands
	 */
	public register (callback: RegistrationCallback, context?: any) {
		var registrar: CommandRegistrar = new CommandRegistrar(this.__commands, context);
		callback(registrar);
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

export default CommandManager;
