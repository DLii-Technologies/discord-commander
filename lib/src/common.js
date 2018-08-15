"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
;
;
;
// Type Guards -------------------------------------------------------------------------------------
/**
 * Check if the given argument implements ICommandRegistrar
 */
exports.isCommandRegistrar = (arg) => {
    return arg.register != undefined && typeof arg.register === "function";
};
//# sourceMappingURL=common.js.map