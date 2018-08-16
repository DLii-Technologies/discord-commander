import CommandInvocation   from "./command_invocation";
import Authorization       from "./authorization";
import { CommandCallback } from "./common";

class Command
{
	/**
	 * Authorization models
	 */
	private __authorization: Authorization[] = [];

	/**
	 * The callback function/method
	 */
	private __run: CommandCallback;

	/**
	 * The context of the callback
	 */
	private __context: any;

	/**
	 * The name of the command
	 */
	private __name: string;

	/**
	 * Create a new command
	 */
	constructor (name: string, auth: Authorization[], callback: CommandCallback | undefined,
				 context?: any)
	{
		this.__authorization = auth.slice();
		this.__name          = name;
		this.__run           = callback || this.run;
		this.__context       = callback ? (context  || callback) : this;
	}

	// Overridable ---------------------------------------------------------------------------------

	/**
	 * Run the command
	 */
	public run (invocation: CommandInvocation) {
		//
	}

	// Public Methods ------------------------------------------------------------------------------

	/**
	 * Authorize the invocation
	 */
	protected authorize (invocation: CommandInvocation) {
		if (this.__authorization.length > 0) {
			for (var i in this.__authorization) {
				if (!this.__authorization[i].isAuthorized(invocation)) {
					return false;
				}
			}
		}
		return true;
	}

	/**
	 * Invoke the command
	 */
	public invoke (invocation: CommandInvocation) {
		if (this.authorize(invocation)) {
			return this.__run.apply(this.__context, [invocation]);
		}
	}
}

export default Command;
