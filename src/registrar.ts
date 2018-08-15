import Authorization                from "./authorization";
import Command                      from "./command";
import { CommandRegistrationError } from "./error";
import {
	AuthorizationCallback,
	CommandCallback,
	ICommandMap,
	ICommandDefinitions,
	ICommandRegistrar,
	RegistrationCallback,
	isCommandRegistrar
} from "./common";

/**
 * A simple command registration system
 */
class Registrar
{
	/**
	 * The required authorization to register the commands with
	 */
	private __authorization: Authorization[] = [];

	/**
	 * The context of the commands to register
	 */
	private __context: any;

	/**
	 * The list of registered commands
	 */
	private __commands: ICommandMap;

	/**
	 * Create a new registrar
	 */
	constructor (commands: ICommandMap, context: any, authorization?: Authorization[]) {
		this.__commands      = commands;
		this.__context       = context;
		this.__authorization = authorization || [];
	}

	/**
	 * Register a command
	 */
	protected registerCommand (name: string, callback?: CommandCallback, context ?: any) {
		if (!callback)
			throw new CommandRegistrationError(`'${name}' has no callback`);
		if (this.__commands[name])
			throw new CommandRegistrationError(`'${name}' has already been registered`);
		this.__commands[name] = new Command(
			name, this.__authorization, callback, context || this.__context
		);
	}

	/**
	 * Register a set of commands
	 */
	protected registerCommands (commands: ICommandDefinitions, context?: any) {
		for (var name in commands) {
			this.registerCommand(name, commands[name], context);
		}
	}

	/**
	 * Register the commands within a module
	 */
	protected registerModule (commandModule: ICommandRegistrar) {
		var registrar = new Registrar(this.__commands, commandModule);
		commandModule.register(registrar);
	}

	/**
	 * Register a list of modules
	 */
	protected registerModules (commandModules: ICommandRegistrar[]) {
		commandModules.forEach((module) => {
			this.registerModule(module);
		});
	}

	// Public Methods ------------------------------------------------------------------------------

	/**
	 * Require a standard callback function to authorize the commands
	 */
	public authorize (auth: AuthorizationCallback, callback: RegistrationCallback): Registrar;

	/**
	 * Requrie an authorization module for the commands
	 */
	public authorize (auth: Authorization, callback: RegistrationCallback): Registrar;

	/**
	 * Require multiple authorization modules for the commands
	 */
	public authorize (auth: Authorization[], callback: RegistrationCallback): Registrar;

	/**
	 * Require authorization for commands
	 */
	public authorize (auth: AuthorizationCallback | Authorization | Authorization[],
					  callback: RegistrationCallback)
	{
		var authorization;
		if (Array.isArray(auth)) {
			authorization = auth;
		} else if (auth instanceof Authorization) {
			authorization = [auth];
		} else {
			authorization = [new Authorization(auth)];
		}
		callback(new Registrar(
			this.__commands, this.__context, this.__authorization.concat(authorization)
		));
		return this;
	}

	/**
	 * Register a command module
	 */
	public register (module: ICommandRegistrar): Registrar;

	/**
	 * Register a list of command modules
	 */
	public register (modules: ICommandRegistrar[]): Registrar;

	/**
	 * Register multiple commands at a time using a Commandmap
	 */
	public register (map: ICommandDefinitions, context?: any): Registrar;

	/**
	 * Register a single command given the name and callback
	 */
	public register (name: string, callback: CommandCallback, context?: any): Registrar;

	/**
	 * Register a command
	 */
	public register (a: ICommandDefinitions | ICommandRegistrar | ICommandRegistrar[] | string,
					 b?: CommandCallback | any, context?: any)
	{
		if (typeof a == "string") {
			this.registerCommand(a, b, context);
		} else if (Array.isArray(a)) {
			this.registerModules(a);
		} else if (isCommandRegistrar(a)) {
			this.registerModule(a);
		} else {
			this.registerCommands(a, b);
		}
		return this;
	}
}

export default Registrar;
