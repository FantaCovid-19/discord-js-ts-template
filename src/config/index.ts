import dotenv from 'dotenv';
import path from 'path';
import { IConfig } from '../@types/config/config';

dotenv.config({
  path: path.resolve(process.cwd(), '.env')
});

class Config {
  public config: IConfig;

  constructor(config: IConfig) {
    this.config = this.validateConfig(config);
  }

  private validateConfig(config: IConfig) {
    for (const [key, value] of Object.entries(config)) {
      if (!value) throw new Error(`Missing environment variable: ${key}`);
    }

    return config;
  }

  public getConfig() {
    return this.config;
  }
}

const config = new Config({
  NODE_ENV: process.env.NODE_ENV,
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DEVS_ID: process.env.DEVS_ID?.split(', '),
  MONGODB_URI: process.env.MONGODB_URI
});

export default config.getConfig();
