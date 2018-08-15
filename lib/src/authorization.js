"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Authorization {
    /**
     * Create a new authorizer to authorize the given command invocaiton
     */
    constructor(authorize) {
        /**
         * A list of role ID's to authorize. If empty, all roles are authorized
         */
        this.roles = [];
        /**
         * A list of role ID's to deny authorization
         */
        this.blockedRoles = [];
        /**
         * A list of user ID's to authorize. If empty, all users are authorized
         */
        this.users = [];
        /**
         * A list of user ID's to deny authorization
         */
        this.blockedUsers = [];
        /**
         * Force role authorization even if list of authorized roles is empty
         */
        this.authorizeRoles = false;
        /**
         * Force user authorization even if list of authorized users is empty
         */
        this.authorizeUsers = false;
        this.__authorize = authorize;
    }
    /**
     * Verify the user's role(s) are correct
     */
    hasValidRoles(invocation) {
        var result = false;
        var roles = invocation.roles;
        for (let i = 0; i < this.roles.length && !result; i++) {
            result = roles.has(this.roles[i]);
        }
        result = result || (this.roles.length == 0 && !this.authorizeRoles);
        for (let i = 0; i < this.blockedRoles.length && result; i++) {
            result = !roles.has(this.blockedRoles[i]);
        }
        return result;
    }
    /**
     * Verify the user is valid
     */
    isValidUser(invocation) {
        var result = true;
        var id = invocation.user.id;
        if (this.users.length > 0 || this.authorizeUsers) {
            result = this.users.indexOf(id) != -1;
        }
        return result && this.blockedUsers.indexOf(id) == -1;
    }
    /**
     * Check if the command invocation is authorized
     */
    isAuthorized(invocation) {
        if (!this.hasValidRoles(invocation) || !this.isValidUser(invocation)) {
            return false;
        }
        if (this.__authorize) {
            return this.__authorize(invocation);
        }
        return this.authorize(invocation);
    }
    // Overridable ---------------------------------------------------------------------------------
    /**
     * Authorize the command invocation
     */
    authorize(invocation) {
        return true;
    }
}
exports.default = Authorization;
//# sourceMappingURL=authorization.js.map