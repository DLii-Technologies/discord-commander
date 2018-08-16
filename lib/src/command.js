"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    /**
     * Create a new command
     */
    constructor(name, auth, callback, context) {
        /**
         * Authorization models
         */
        this.__authorization = [];
        this.__authorization = auth.slice();
        this.__name = name;
        this.__run = callback || this.run;
        this.__context = callback ? (context || callback) : this;
    }
    // Overridable ---------------------------------------------------------------------------------
    /**
     * Run the command
     */
    run(invocation) {
        //
    }
    // Public Methods ------------------------------------------------------------------------------
    /**
     * Authorize the invocation
     */
    authorize(invocation) {
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
    invoke(invocation) {
        if (this.authorize(invocation)) {
            return this.__run.apply(this.__context, [invocation]);
        }
    }
}
exports.default = Command;
//# sourceMappingURL=command.js.map