export type CommandHandler = (cmdName: string, ...args: string[]) => void;

export type CommandsRegistry = Record<string, CommandHandler>;

export function registerCommand(registry: CommandsRegistry, cmdName: string, handler: CommandHandler) {
   registry[cmdName] = handler;
}

export function runCommand(registry: CommandsRegistry, cmdName: string, ...args: string[]) {
   if (cmdName in registry) {
      const handler = registry[cmdName];
      handler(cmdName, ...args);
   } else {
      throw new Error(`Unrecognized command: ${cmdName}`);
   }
}
