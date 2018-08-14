import * as DC    from "../index";
import { Client } from "discord.js";
import { config } from "dotenv";
import { expect } from "chai";
import "mocha";
import TestCommandModule from "./command_module";

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

/**
 * Register a command
 */
commander.register((registrar: DC.CommandRegistrar) => {

	// Standard callback function registration
	registrar.register("test", (command: DC.CommandInvocation) => {
		console.log("It works!");
	});

	// Command Module registration
	registrar.register(new TestCommandModule());

	// Register commands using a CommandDefinition map
	registrar.register({
		"testmulti": (cmd: DC.CommandInvocation) => {
			console.log("Test Multi");
		}
	});
});
