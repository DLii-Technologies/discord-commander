import Command from "./command";
import CommandInvocation from "./command_invocation";
import Registrar from "./registrar";
/**
 * The function signature for a command authorization callback
 */
export declare type AuthorizationCallback = (invocation: CommandInvocation) => boolean;
/**
 * The function signature for command callback functions
 */
export declare type CommandCallback = (command: CommandInvocation) => void;
/**
 * The function signature for a command registration callback
 */
export declare type RegistrationCallback = (registrar: Registrar) => void;
/**
 * Map the given commands to the callback functions
 */
export interface ICommandDefinitions {
    [key: string]: CommandCallback;
}
/**
 * Map the given command names to the command record
 */
export interface ICommandMap {
    [key: string]: Command;
}
/**
 * Used to register commands within a module while retaining the context
 */
export interface ICommandRegistrar {
    /**
     * Register some commands
     */
    register(registrar: Registrar): void;
}
/**
 * Map the given events to callback functions
 */
export interface IEventMap {
    [key: string]: (...args: any[]) => void;
}
/**
 * Check if the given argument implements ICommandRegistrar
 */
export declare const isCommandRegistrar: (arg: any) => arg is ICommandRegistrar;
