class Command
{
	/**
	 * The name of the command
	 */
	private __name: string = "";

	/**
	 * The original command string
	 */
	private __cmdString: string;

	/**
	 * Create a new command
	 */
	constructor (command: string) {
		this.__cmdString = command.trim();
		this.initName(this.__cmdString);
	}

	/**
	 * Set the name given the command string
	 */
	protected initName (cmdString: string) {
		var index = this.__cmdString.indexOf(' ');
		if (index == -1)
			this.__name = cmdString;
		else
			this.__name = cmdString.substr(0, index);
	}

	/**
	 * Get the name of the command
	 */
	public get name () {
		return this.__name;
	}
}

export default Command;
