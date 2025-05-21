import { setUser, readConfig } from "./config";

function main() {
   setUser("Todd");
   const config = readConfig();
   console.log(config);
}

main();