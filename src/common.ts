import Command           from "./command";
import CommandInvocation from "./command_invocation";
import CommandRegistrar  from "./command_registrar";

// Types -------------------------------------------------------------------------------------------

/**
 * The function signature for command callback functions
 */
export type CommandCallback = (command: CommandInvocation) => void;

/**
 * The function signature for a command registration callback
 */
export type RegistrationCallback = (registrar: CommandRegistrar) => void;

// Interfaces --------------------------------------------------------------------------------------

/**
 * Map the given commands to the callback functions
 */
export interface ICommandDefinitions {
	[key: string]: CommandCallback
};

/**
 * Map the given command names to the command record
 */
export interface ICommandMap {
	[key: string]: Command
};

/**
 * Used to register commands within a module while retaining the context
 */
export interface ICommandRegistrar {

	/**
	 * Register some commands
	 */
	register (registrar: CommandRegistrar): void;
};

/**
 * Map the given events to callback functions
 */
export interface IEventMap {
	[key: string]: (...args: any[]) => void;
};

// Type Guards -------------------------------------------------------------------------------------

/**
 * Check if the given argument implements ICommandRegistrar
 */
export const isCommandRegistrar = (arg: any): arg is ICommandRegistrar => {
	return arg.register != undefined && typeof arg.register === "function";
};
