import { Client, GatewayIntentBits, Partials, Collection } from 'discord.js';

import config from '../../config';
import CommandHandler from '../handler/CommandHandler';
import EventHandler from '../handler/EventHandler';
import Database from './Database';

export default class DiscordClient extends Client {
  public readonly config = config;

  public events = new EventHandler(this);
  public commands = new CommandHandler(this);

  public database = new Database(this);

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMembers
      ],
      partials: [
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.User
      ]
    });
  }

  public async start() {
    console.log('> Starting Discord client...');
    this.login(this.config.DISCORD_TOKEN);
  }
}
