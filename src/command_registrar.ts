import Command             from "./command";
import CommandModule       from "./command_module";
import { isCommandModule } from "./utilities";
import * as Common         from "./common";

/**
 * A simpler registration system for
 */
class CommandRegistrar
{
	/**
	 * The context of the commands to register
	 */
	public context: any;

	/**
	 * The list of registered commands
	 */
	private __commands: Common.ICommandMap = {};

	/**
	 * Get a command from the registrar
	 */
	public fetch (name: string) {
		return this.__commands[name];
	}

	/**
	 * Check if the command has been registered
	 */
	public has (name: string) {
		return Boolean(this.__commands[name]);
	}

	/**
	 * Register a command module
	 */
	public register (module: CommandModule): CommandRegistrar;

	/**
	 * Register a list of command modules
	 */
	public register (modules: CommandModule[]): CommandRegistrar;

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
	public register (a: Common.ICommandDefinitions | CommandModule | CommandModule[] | string,
					 b?: Common.CommandCallback | any, context?: any)
	{
		if (typeof a == "string") {
			this.registerCommand(a, b, context);
		} else if (Array.isArray(a)) {
			this.registerModules(a);
		} else if (isCommandModule(a)) {
			this.registerModule(a);
		} else {
			this.registerCommands(a, b);
		}
		return this;
	}

	/**
	 * Register a command
	 */
	protected registerCommand (name: string, callback?: Common.CommandCallback, context ?: any) {
		if (!callback)
			throw new Error(`Command Registration Error: '${name}' has no callback`);
		if (this.has(name))
			throw new Error(`Command Registration Error: '${name}' has already been registered`);
		this.__commands[name] = new Command(name, callback, context || this.context);
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
	protected registerModule (commandModule: CommandModule) {
		var context = this.context;
		this.context = commandModule;
		commandModule.register(this);
		this.context = context;
		return this;
	}

	/**
	 * Register a list of modules
	 */
	protected registerModules (commandModules: CommandModule[]) {
		commandModules.forEach((module) => {
			this.registerModule(module);
		});
	}
}

export default CommandRegistrar;
