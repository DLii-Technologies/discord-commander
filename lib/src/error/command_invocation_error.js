"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandInvocationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = CommandInvocationError;
//# sourceMappingURL=command_invocation_error.js.map