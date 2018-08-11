"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    /**
     * Create a new command
     */
    constructor(command) {
        /**
         * The name of the command
         */
        this.__name = "";
        this.__cmdString = command.trim();
        this.initName(this.__cmdString);
    }
    /**
     * Set the name given the command string
     */
    initName(cmdString) {
        var index = this.__cmdString.indexOf(' ');
        if (index == -1)
            this.__name = cmdString;
        else
            this.__name = cmdString.substr(0, index);
    }
    /**
     * Get the name of the command
     */
    get name() {
        return this.__name;
    }
}
exports.default = Command;
//# sourceMappingURL=command.js.map