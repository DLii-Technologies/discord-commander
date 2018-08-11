import * as DC    from "../index";
import { Client } from "discord.js";
import { config } from "dotenv";
import { expect } from "chai";
import "mocha";

// Initialization ----------------------------------------------------------------------------------

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

// Discord Initialization --------------------------------------------------------------------------

/**
 * Create a new bot instance
 */
var bot = new Client();

/**
 * Boot up the bot
 */
describe("Bot Bootup", () => {
	it("should be online and ready", (done: Mocha.Done) => {
		bot.on("ready", () => {
			done();
		});
		bot.login(CLIENT_ID);
	}).timeout(10000);
});

// Discord Commander -------------------------------------------------------------------------------

/**
 * Create the Discord Commander
 */
var commander = new DC.DiscordCommander(bot);

class CallbackTest
{
	/**
	 * This should be accessible
	 */
	private __testVar = 15;

	/**
	 * A test callback function to register
	 */
	public test (command?: DC.Command) {
		console.log(this);
		console.log(this.__testVar);
	}
}

var ct = new CallbackTest();


/**
 * Register a command
 */
commander.register("test", ct.test, ct);
