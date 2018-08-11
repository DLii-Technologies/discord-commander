"use strict";
exports.__esModule = true;
var index_1 = require("../index");
exports.createBot = function (clientId) {
    var cmd = new index_1.DiscordCommander(clientId);
    return cmd;
};
exports.registerCommands = function (bot) {
    bot.commandRegistrar.register("test", function (command) {
        console.log("The command worked successfully!");
    });
};
