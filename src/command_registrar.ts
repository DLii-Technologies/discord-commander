import Command     from "./command";
import * as Common from "./common";

/**
 * A simple command registration system
 */
class CommandRegistrar
{
	/**
	 * The context of the commands to register
	 */
	private __context: any;

	/**
	 * The list of registered commands
	 */
	private __commands: Common.ICommandMap;

	/**
	 * Authorized roles
	 */
	private __rolesAuthorized: string[] = [];

	/**
	 * Denied roles
	 */
	private __rolesBlacklisted: string[] = [];

	/**
	 * Create a new registrar
	 */
	constructor (commands: Common.ICommandMap, context: any) {
		this.__commands = commands;
		this.__context  = context;
	}

	/**
	 * Register a command
	 */
	protected registerCommand (name: string, callback?: Common.CommandCallback, context ?: any) {
		if (!callback)
			throw new Error(`Command Registration Error: '${name}' has no callback`);
		if (this.__commands[name])
			throw new Error(`Command Registration Error: '${name}' has already been registered`);
		this.__commands[name] = new Command(name, callback, context || this.__context);
	}

	/**
	 * Register a set of commands
	 */
	protected registerCommands (commands: Common.ICommandDefinitions, context?: any) {
		for (var name in commands) {
			this.registerCommand(name, commands[name], context);
		}
	}

	/**
	 * Register the commands within a module
	 */
	protected registerModule (commandModule: Common.ICommandRegistrar) {
		var registrar = new CommandRegistrar(this.__commands, commandModule);
		commandModule.register(registrar);
	}

	/**
	 * Register a list of modules
	 */
	protected registerModules (commandModules: Common.ICommandRegistrar[]) {
		commandModules.forEach((module) => {
			this.registerModule(module);
		});
	}

	// Public Methods ------------------------------------------------------------------------------

	/**
	 * Register a command module
	 */
	public register (module: Common.ICommandRegistrar): CommandRegistrar;

	/**
	 * Register a list of command modules
	 */
	public register (modules: Common.ICommandRegistrar[]): CommandRegistrar;

	/**
	 * Register multiple commands at a time using a Commandmap
	 */
	public register (map: Common.ICommandDefinitions, context?: any): CommandRegistrar;

	/**
	 * Register a single command given the name and callback
	 */
	public register (name: string, callback: Common.CommandCallback, context?: any): CommandRegistrar;

	/**
	 * Register a command
	 */
	public register (a: Common.ICommandDefinitions | Common.ICommandRegistrar | Common.ICommandRegistrar[] | string,
					 b?: Common.CommandCallback | any, context?: any)
	{
		if (typeof a == "string") {
			this.registerCommand(a, b, context);
		} else if (Array.isArray(a)) {
			this.registerModules(a);
		} else if (Common.isCommandRegistrar(a)) {
			this.registerModule(a);
		} else {
			this.registerCommands(a, b);
		}
		return this;
	}
}

export default CommandRegistrar;
