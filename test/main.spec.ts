import { config } from "dotenv";
import { expect } from "chai";
import "mocha";
import { createBot, registerCommands } from "./create_bot";

/**
 * Configure the environment using 'dotenv'
 */
const env = config();

/**
 * The client ID for the Discord bot
 */
const CLIENT_ID: string = env.error || !env.parsed ? "" : env.parsed["CLIENT_ID"];

/**
 * Verify the client ID came in correctly
 */
describe("Client ID", () => {
	it("should be defined", () => {
		expect(CLIENT_ID).to.not.equal(env.error);
		expect(CLIENT_ID).to.not.equal("");
	});
});

/**
 * Create a new bot instance
 */
var bot = createBot(CLIENT_ID);

/**
 * Register the commands on the bot
 */
registerCommands(bot);

/**
 * Boot up the bot
 */
describe("Bot Bootup", () => {
	it("should be online and ready", (done: Mocha.Done) => {
		bot.on("ready", () => {
			done();
		});
		bot.boot();
	}).timeout(10000);
});

