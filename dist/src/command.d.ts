declare class Command {
    /**
     * The name of the command
     */
    private __name;
    /**
     * The original command string
     */
    private __cmdString;
    /**
     * Create a new command
     */
    constructor(command: string);
    /**
     * Set the name given the command string
     */
    protected initName(cmdString: string): void;
    /**
     * Get the name of the command
     */
    readonly name: string;
}
export default Command;
