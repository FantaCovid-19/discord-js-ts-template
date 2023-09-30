import { Interaction } from 'discord.js';
import Events from '../../libs/structure/Events';

export default class InteractionCreateEvent extends Events {
  name = 'interactionCreate';

  async execute(interaction: Interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = this.client.commands.get(interaction.commandName);

    if (!command)
      return interaction.reply({
        content: 'An error has occurred.',
        ephemeral: true
      });

    if (
      command.devOnly &&
      !this.client.config.DEVS_ID!.includes(interaction.user.id)
    )
      return interaction.reply({
        content: 'You are not allowed to use this command.',
        ephemeral: true
      });

    try {
      command.execute(interaction);
    } catch (error) {
      console.error(error);
      interaction.reply({
        content: 'An error has occurred.',
        ephemeral: true
      });
    }
  }
}
