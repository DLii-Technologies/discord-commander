import { Common, Registrar, CommandInvocation } from "../";

class TestCommandModule implements Common.ICommandRegistrar
{
	public testModVar = false;

	testMod (invocation: CommandInvocation) {
		this.testModVar = true;
		invocation.message.reply("Test module ran!");
	}

	register (registrar: Registrar) {
		console.log("Registered");
		registrar.register("testmod", this.testMod);
	}
}

export default TestCommandModule;
