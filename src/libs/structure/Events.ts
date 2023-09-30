import DiscordClient from './DiscordClient';

export default class Events {
  readonly client: DiscordClient;

  public name: string = '';
  public once: boolean = false;

  constructor(client: DiscordClient) {
    this.client = client;
  }

  public execute(..._args: unknown[]) {
    throw new Error(`Event ${this.name} doesn't have an execute() method.`);
  }
}
