import { Authorization, CommandInvocation } from "../";

class AuthModule extends Authorization
{
	/**
	 * Authorized roles
	 */
	roles = [
		// "479049390586331156" // Test Role
	];

	/**
	 * Unauthorized roles
	 */
	blockedRoles = [
		// "479186318023458826" // Blocked Role
	];

	/**
	 * Unauthorized users
	 */
	blockedUsers = [
		// "318338596044013570" // SirDavidLudwig
	];

	public authorize(invocation: CommandInvocation) {
		return true;
	}
}

export default AuthModule;
