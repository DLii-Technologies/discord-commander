import CommandModule    from "../src/command_module";
import CommandRegistrar from "../src/command_registrar";

class TestCommandModule implements CommandModule
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

	unregister (registrar: CommandRegistrar) {
		// registrar.unregister("testmod");
	}
}

export default TestCommandModule;
