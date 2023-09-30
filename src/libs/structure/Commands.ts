import { SlashCommandBuilder } from '@discordjs/builders';

import DiscordClient from './DiscordClient';

export default class Commands {
  readonly client: DiscordClient;

  public name: string = '';
  public description: string = '';
  public options: any[] = [];
  public devOnly: boolean = false;

  constructor(client: DiscordClient) {
    this.client = client;
  }

  public execute(..._args: unknown[]) {
    throw new Error(`Command ${this.name} doesn't have an execute() method.`);
  }

  public toJSON() {
    const command = new SlashCommandBuilder()
      .setName(this.name)
      .setDescription(this.description);

    this.options.forEach((option) => {
      command.options.push(option);
    });

    return command.toJSON();
  }
}
