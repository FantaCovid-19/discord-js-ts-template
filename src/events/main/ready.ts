import Events from '../../libs/structure/Events';

export default class ReadyEvent extends Events {
  name = 'ready';

  async execute() {
    await this.client.commands.deployCommands();

    console.log(`Logged in as ${this.client.user?.tag}!`);
  }
}
