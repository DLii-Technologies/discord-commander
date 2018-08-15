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
var bot = new DC.DiscordCommander();

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

	// Use a standard closure for authorization
	registrar.authorize((invocation: DC.CommandInvocation) => {
		return invocation.hasRole("479049390586331156");
	}, (registrar: DC.Registrar) => {
		registrar.register("auth", (cmd: DC.CommandInvocation) => {
			console.log("Authorization closure works");
		});
	});

	// Use a module for authorization
	registrar.authorize(new AuthModule(), (registrar: DC.Registrar) => {
		registrar.register("authmod", (cmd: DC.CommandInvocation) => {
			console.log("Authorization Module works!");
		});
	});
});
