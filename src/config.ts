import fs from "fs";
import os from "os";
import path from "path";

type Config = {
   dbUrl: string;
   currentUserName: string;
}

export function setUser(userName: string) {
   const config = readConfig();
   config.currentUserName = userName;
   writeConfig(config);
}

export function readConfig(): Config {
   const configPath = getConfigFilePath();

   const data = fs.readFileSync(configPath, "utf-8");
   const rawConfig = JSON.parse(data);

   const config = validateConfig(rawConfig);
   return config;
}

function getConfigFilePath(): string {
   return path.join(os.homedir(), '.gatorconfig.json');
}

function writeConfig(config: Config) {
   const configPath = getConfigFilePath();

   const rawConfig = {
      db_url: config.dbUrl,
      current_user_name: config.currentUserName,
   };

   const data = JSON.stringify(rawConfig, null, 2);
   fs.writeFileSync(configPath, data, { encoding: 'utf8' });
}

function validateConfig(rawConfig: any) {
   if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
      throw new Error("db_url is required in config file");
   }
   if (
      !rawConfig.current_user_name ||
      typeof rawConfig.current_user_name !== "string"
   ) {
      throw new Error("current_user_name is required in config file");
   }

   const config: Config = {
      dbUrl: rawConfig.db_url,
      currentUserName: rawConfig.current_user_name,
   };

   return config;
}
