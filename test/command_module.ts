import { Common, Registrar } from "../";

class TestCommandModule implements Common.ICommandRegistrar
{
	public testModVar = false;

	testMod () {
		this.testModVar = true;
		console.log("Test module ran!");
	}

	register (registrar: Registrar) {
		console.log("Registered");
		registrar.register("testmod", this.testMod);
	}
}

export default TestCommandModule;
