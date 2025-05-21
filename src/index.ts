import {type CommandsRegistry, registerCommand, runCommand} from './commands/commands';
import { handlerLogin } from './commands/users';

function main() {
   const registry: CommandsRegistry = {};
   registerCommand(registry, "login", handlerLogin);

   const [cmdName, ...args] = process.argv.slice(2);
   if (cmdName === undefined) {
      console.log("Usage: cli <command> [args...]");
      process.exit(1);
   }

   try {
      runCommand(registry, cmdName, ...args);
   } catch (err) {
      console.log((err as Error).message);
      process.exit(1);
   }
}

main();