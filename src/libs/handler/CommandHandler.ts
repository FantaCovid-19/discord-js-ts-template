import { Collection } from 'discord.js';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import path from 'path';

import DiscordClient from '../structure/DiscordClient';
import Commands from '../structure/Commands';
import getAllFiles from '../../util/getAllFiles';

export default class CommandHandler extends Collection<string, Commands> {
  public readonly client: DiscordClient;

  constructor(client: DiscordClient) {
    super();

    this.client = client;
    this.loadCommands();
  }

  private loadCommands() {
    const getPath = path.join(__dirname, '../../commands');
    const commandFiles = getAllFiles(getPath);

    commandFiles.forEach((file) => {
      const commandClass = ((r) => r.default || r)(require(file));
      const files = new commandClass(this.client);

      this.set(files.name, files);
    });
  }

  public async deployCommands() {
    const rest = new REST({ version: '9' }).setToken(
      this.client.config.DISCORD_TOKEN!
    );
    const commands = this.map((command) => command.toJSON());
    const guilds = this.client.guilds.cache;

    guilds.forEach((guild) => {
      rest.put(
        Routes.applicationGuildCommands(
          this.client.config.DISCORD_CLIENT_ID!,
          guild.id
        ),
        { body: commands }
      );
    });
  }
}
