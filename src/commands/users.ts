import { setUser } from "../config";

export function handlerLogin(cmdname: string, ...args: string[]) {
   if (args.length === 0) {
      throw new Error("Usage: login <username>");
   }

   const username = args[0];
   setUser(username);
   console.log(`Logged in as "${username}"`);
}
