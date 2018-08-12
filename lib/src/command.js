"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    /**
     * Create a new command
     */
    constructor(name, callback, context) {
        this.__name = name;
        this.__callback = callback;
        this.__context = context || callback;
    }
    /**
     * Invoke the command
     */
    invoke(args) {
        this.__callback.apply(args, this.__context);
    }
}
exports.default = Command;
//# sourceMappingURL=command.js.map