import CommandModule  from "./command_module";
import { ICommandMap } from "./common";

/**
 * Check if the given argument is a CommandModule
 */
export const isCommandModule = (arg: any): arg is CommandModule => {
	return arg.register != undefined && typeof arg.register === "function";
}
