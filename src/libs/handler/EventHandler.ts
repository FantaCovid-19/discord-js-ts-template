import { Collection } from 'discord.js';
import path from 'path';

import DiscordClient from '../structure/DiscordClient';
import Events from '../structure/Events';
import getAllFiles from '../../util/getAllFiles';

export default class EventHandler extends Collection<string, Events> {
  public readonly client: DiscordClient;

  constructor(client: DiscordClient) {
    super();

    this.client = client;
    this.loadEvents();
  }

  private loadEvents() {
    const getPath = path.join(__dirname, '../../events');
    const eventFiles = getAllFiles(getPath);

    eventFiles.forEach((file) => {
      const eventClass = ((r) => r.default || r)(require(file));
      const event = new eventClass(this.client);

      this.set(event.name, event);
      this.client[event.once ? 'once' : 'on'](
        event.name,
        (..._args: unknown[]) => event.execute(..._args)
      );
    });
  }
}
