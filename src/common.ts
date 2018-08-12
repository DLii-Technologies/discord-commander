import Command     from "./command";
import CommandArgs from "./command_args";

// Types -------------------------------------------------------------------------------------------

/**
 * The function signature for command callback functions
 */
export type CommandCallback = (command: CommandArgs) => void;

// Interfaces --------------------------------------------------------------------------------------

/**
 * Map the given commands to the callback functions
 */
export interface ICommandDefinitions {
	[key: string]: CommandCallback
}

/**
 * Map the given command names to the command record
 */
export interface ICommandMap {
	[key: string]: Command
};

/**
 * Map the given events to callback functions
 */
export interface IEventMap {
	[key: string]: (...args: any[]) => void;
};
