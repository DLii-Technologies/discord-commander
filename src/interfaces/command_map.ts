import Command from "../command";

/**
 * The function signature for command callback functions
 */
export type CommandCallback = (command: Command) => void;

/**
 * Map the given commands to callback functions
 */
export interface CommandMap {
	[key: string]: CommandCallback
};
