import { ICommandRegistrar } from "../src/common";
import CommandRegistrar      from "../src/command_registrar";

class TestCommandModule implements ICommandRegistrar
{
	public testModVar = false;

	testMod () {
		this.testModVar = true;
		console.log("Test module ran!");
	}

	register (registrar: CommandRegistrar) {
		console.log("Registered");
		registrar.register("testmod", this.testMod);
	}
}

export default TestCommandModule;
