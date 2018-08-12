import CommandRegistrar from "./command_registrar";

interface CommandModule
{
	register (registrar: CommandRegistrar): void;
	unregister (registrar: CommandRegistrar): void;
}

export default CommandModule;
