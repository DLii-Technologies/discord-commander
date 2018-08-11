import { DiscordCommander, Command } from "../index";

export const createBot = (clientId: string): DiscordCommander => {
	var cmd: DiscordCommander = new DiscordCommander(clientId);
	return cmd;
}

export const registerCommands = (bot: DiscordCommander) => {
	bot.commandRegistrar.register("test", (command: Command) => {
		console.log("The command worked successfully!");
	});
}
