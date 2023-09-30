import Commands from '../../libs/structure/Commands';

export default class PingCommand extends Commands {
  name = 'ping';
  description = 'Replies with pong!';
  options = [];

  async execute(interaction: any) {
    interaction.reply('Pong!');
  }
}
