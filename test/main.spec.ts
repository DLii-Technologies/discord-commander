/**
 * This is not a proper unit test.
 *
 * Since this module realies almost entirely on external interactions, I'm not exactly sure how to
 * set up the tests properly. For now, you set up your Discord bot's client ID in the `.env` file,
 * boot it up, and test out the list of registered commands. Test impromevent is greatly welcome!
 */

import * as DC    from "../";
import { config } from "dotenv";
import { expect } from "chai";
import "mocha";
import TestCommandModule from "./command_module";
import AuthModule from "./auth_module";

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
var bot = new DC.Bot();

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
 * Register a command
 */
bot.register((registrar: DC.Registrar) => {

	// Standard callback function registration
	registrar.register("test", (invocation: DC.CommandInvocation) => {
		invocation.message.reply("Test works!");
	});

	// Command Module registration
	registrar.register(new TestCommandModule());

	// Register commands using a CommandDefinition map
	registrar.register({
		"testmulti": (invocation: DC.CommandInvocation) => {
			invocation.message.reply("Test multi");
		}
	});

	// Use a standard closure for authorization
	registrar.authorize((invocation: DC.CommandInvocation) => {
		return invocation.hasRole("479049390586331156");
	}, (registrar: DC.Registrar) => {
		registrar.register("auth", (invocation: DC.CommandInvocation) => {
			invocation.message.reply("Auth test");
		});
	});

	// Use a module for authorization
	registrar.authorize(new AuthModule(), (registrar: DC.Registrar) => {
		registrar.register("authmod", (invocation: DC.CommandInvocation) => {
			invocation.message.reply("Auth mod test");
		});
	});
});
