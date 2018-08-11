import CommandMap from "./interfaces/command_map";
import Command    from "./command";

/**
 * The class keeps track of all commands
 */
class CommandRegistrar
{
	/**
	 * The list of commands
	 */
	__commands: CommandMap

	/**
	 * Create a new command registrar
	 */
	constructor () {
		this.__commands = {};
	}

	/**
	 * Fetch the given command
	 */
	public fetch(name: string): Function {
		return this.__commands[name];
	}

	/**
	 * Check if the command exists
	 */
	public has (name: string): boolean {
		return Boolean(this.__commands[name]);
	}

	/**
	 * Invoke the given command
	 */
	public invoke(command: Command): CommandRegistrar {
		console.log("Invoking the method...");
		if (!this.has(command.name))
			throw new Error(`Command Invocation Error: '${command.name}' not found`);

		this.__commands[command.name](command);
		return this;
	}

	/**
	 * Register a new command
	 */
	public register (name: string, callback: Function): CommandRegistrar {
		if (this.has(name))
			throw new Error(`Command Registration Error: '${name}' has already been registered`);
		this.__commands[name] = callback;
		return this;
	}

	/**
	 * Register a set of commands at once
	 */
	public registerAll (commands: CommandMap): CommandRegistrar {
		for (var name in commands)
			this.register(name, commands[name]);
		return this;
	}
}

export default CommandRegistrar;
