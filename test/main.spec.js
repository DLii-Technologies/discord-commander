"use strict";
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var chai_1 = require("chai");
require("mocha");
var create_bot_1 = require("./create_bot");
/**
 * Configure the environment using 'dotenv'
 */
var env = dotenv_1.config();
/**
 * The client ID for the Discord bot
 */
var CLIENT_ID = env.error || !env.parsed ? "" : env.parsed["CLIENT_ID"];
/**
 * Verify the client ID came in correctly
 */
describe("Client ID", function () {
    it("should be defined", function () {
        chai_1.expect(CLIENT_ID).to.not.equal(env.error);
        chai_1.expect(CLIENT_ID).to.not.equal("");
    });
});
/**
 * Create a new bot instance
 */
var bot = create_bot_1.createBot(CLIENT_ID);
/**
 * Register the commands on the bot
 */
create_bot_1.registerCommands(bot);
/**
 * Boot up the bot
 */
describe("Bot Bootup", function () {
    it("should be online and ready", function (done) {
        bot.on("ready", function () {
            done();
        });
        bot.boot();
    }).timeout(10000);
});
