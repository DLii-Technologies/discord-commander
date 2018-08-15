import CommandInvocation         from "./command_invocation";
import { AuthorizationCallback } from "./common";

class Authorization
{
	/**
	 * A list of role ID's to authorize. If empty, all roles are authorized
	 */
	protected roles: string[] = [];

	/**
	 * A list of role ID's to deny authorization
	 */
	protected blockedRoles: string[] = [];

	/**
	 * A list of user ID's to authorize. If empty, all users are authorized
	 */
	protected users: string[] = []

	/**
	 * A list of user ID's to deny authorization
	 */
	protected blockedUsers: string[] = [];

	/**
	 * Force role authorization even if list of authorized roles is empty
	 */
	protected authorizeRoles = false;

	/**
	 * Force user authorization even if list of authorized users is empty
	 */
	protected authorizeUsers = false;

	// ---------------------------------------------------------------------------------------------

	/**
	 * An external authorization function to invoke
	 */
	private __authorize: AuthorizationCallback | undefined;

	/**
	 * Create a new authorizer to authorize the given command invocaiton
	 */
	constructor (authorize?: AuthorizationCallback) {
		this.__authorize  = authorize;
	}

	/**
	 * Verify the user's role(s) are correct
	 */
	protected hasValidRoles (invocation: CommandInvocation) {
		var result = false;
		var roles  = invocation.roles;
		for (let i = 0; i < this.roles.length && !result; i++) {
			result = roles.has(this.roles[i]);
		}
		result = result || (this.roles.length == 0 && !this.authorizeRoles);
		for (let i = 0; i < this.blockedRoles.length && result; i++) {
			result = !roles.has(this.blockedRoles[i]);
		}
		return result;
	}

	/**
	 * Verify the user is valid
	 */
	protected isValidUser (invocation: CommandInvocation) {
		var result = true;
		var id     = invocation.user.id;
		if (this.users.length > 0 || this.authorizeUsers) {
			result = this.users.indexOf(id) != -1;
		}
		return result && this.blockedUsers.indexOf(id) == -1;
	}

	/**
	 * Check if the command invocation is authorized
	 */
	public isAuthorized (invocation: CommandInvocation) {
		if (!this.hasValidRoles(invocation) || !this.isValidUser(invocation)) {
			return false;
		}
		if (this.__authorize) {
			return this.__authorize(invocation);
		}
		return this.authorize(invocation);
	}

	// Overridable ---------------------------------------------------------------------------------

	/**
	 * Authorize the command invocation
	 */
	public authorize (invocation: CommandInvocation): boolean {
		return true;
	}
}

export default Authorization;
