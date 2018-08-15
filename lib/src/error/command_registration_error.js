"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Represents a command registration error
 */
class CommandRegistrationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = CommandRegistrationError;
//# sourceMappingURL=command_registration_error.js.map