import CommandInvocation from "./command_invocation";
import { AuthorizationCallback } from "./common";
declare class Authorization {
    /**
     * A list of role ID's to authorize. If empty, all roles are authorized
     */
    protected roles: string[];
    /**
     * A list of role ID's to deny authorization
     */
    protected blockedRoles: string[];
    /**
     * A list of user ID's to authorize. If empty, all users are authorized
     */
    protected users: string[];
    /**
     * A list of user ID's to deny authorization
     */
    protected blockedUsers: string[];
    /**
     * Force role authorization even if list of authorized roles is empty
     */
    protected authorizeRoles: boolean;
    /**
     * Force user authorization even if list of authorized users is empty
     */
    protected authorizeUsers: boolean;
    /**
     * An external authorization function to invoke
     */
    private __authorize;
    /**
     * Create a new authorizer to authorize the given command invocaiton
     */
    constructor(authorize?: AuthorizationCallback);
    /**
     * Verify the user's role(s) are correct
     */
    protected hasValidRoles(invocation: CommandInvocation): boolean;
    /**
     * Verify the user is valid
     */
    protected isValidUser(invocation: CommandInvocation): boolean;
    /**
     * Check if the command invocation is authorized
     */
    isAuthorized(invocation: CommandInvocation): boolean;
    /**
     * Authorize the command invocation
     */
    authorize(invocation: CommandInvocation): boolean;
}
export default Authorization;
