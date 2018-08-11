import Discord          from "discord.js";
import Command          from "./command";
import CommandRegistrar from "./command_registrar";

class DiscordCommander extends Discord.Client
{
	/**
	 * The command prefix
	 */
	public commandPrefix = '!';

	/**
	 * The Registrar stores each of the registered command modules
	 */
	private __registrar: CommandRegistrar;

	/**
	 * The client ID for the Discord bot
	 */
	private __clientId: string;

	/**
	 * Create a new DiscordCommander Discord bot
	 */
	public constructor (clientId: string){
		super();
		this.__clientId  = clientId;
		this.__registrar = new CommandRegistrar();
	}

	/**
	 * Register the event listeners
	 */
	protected registerListeners () {
		this.on("message", this.onMessage);
	}

	/**
	 * Start the bot
	 */
	public boot () {
		this.registerListeners();
		this.login(this.__clientId);
	}

	// Event Handlers ------------------------------------------------------------------------------

	/**
	 * Invoked when a message is received from Discord
	 */
	protected onMessage (message: Discord.Message) {
		var name: string = message.content.split(' ')[0];
		if (name.startsWith(this.commandPrefix) && name.length > this.commandPrefix.length) {
			// Shave off the prefix
			if (this.__registrar.has(name.substr(this.commandPrefix.length))) {
				this.__registrar.invoke(
					new Command(message.content.substr(this.commandPrefix.length))
				);
			}
		}
	}

	// Accessors -----------------------------------------------------------------------------------

	/**
	 * Get the command registrar
	 */
	get commandRegistrar () {
		return this.__registrar;
	}
}

export default DiscordCommander;
