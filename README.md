<h1 align="center">Discord.JS Typescript Template</h1>
<p align="left">
  <img src="https://img.shields.io/badge/Status-En%20Desarrollo-green">
  <img src="https://img.shields.io/badge/Version-0.1.0-blue">
</p>

<h2 align="left">[!]Requirements for installation</h2>
<ul>
  <li>Node.JS >= 18.17.0</li>
  <li>NPM >= 9.8.0</li>
  <li>Discord Developer</li>
</ul>

<h3 aling="left">Usage:</h3>
<h4 aling="left">Installation:</h4>

```
$ git clone https://github.com/FantaCovid-19/discord-js-ts-template.git
$ cd discord-js-ts-template
$ npm install
$ nano .env.example
$ mv .env.example .env
$ tsc
$ npm start
```

<h4 alignt="left">Development Usage</h4>

```
$ npm run dev # Run environment by nodemon
```

<h2 aling="left">How to create commands</h2>

You must create the following files in the following directory `src/commands` no matter if it is outside or inside a folder to categorize them.

<h3 align="left">Command without options</h3>

```ts
import { CommandInteraction } from 'discord.js';
import Commands from '../../libs/structure/Commands';

export default class PingCommand extends Commands {
  name = 'ping';
  description = 'Replies with pong!';
  options = [];
  devOnly = false;
  category = 'Misc';
  
  async execute(interaction: CommandInteraction) {
    interaction.reply('Pong!');
  }
}
```
<h3 align="left">Command with options</h3>

```ts
import { CommandInteraction, SlashCommandStringOption } from 'discord.js';
import Commands from '../../libs/structure/Commands';

export default class SayCommand extends Commands {
  name = 'say';
  description = 'Create custom message!';
  options = [
    new SlashCommandStringOption()
      .setName('message')
      .setDescription('Typing message...')
      .setRequired(true)
  ];
  devOnly = false;
  category = 'Misc';

  async execute(interaction: CommandInteraction) {
    const { options } = interaction
    const message = options.get('message', true).value as string;

    interaction.reply(message);
  }
}
```
<h3 align="left">Options</h3>
<ul>
  <li>new SlashCommandStringOption(): String</li>
  <li>new SlashCommandIntegerOption(): Integer</li>
  <li>new SlashCommandBooleanOption(): Boolean</li>
  <li>new SlashCommandChannelOption(): Channel</li>
  <li>new SlashCommandRoleOption(): Role</li>
</ul>

<h2 aling="left">How to create events</h2>

You must create the following files in the following directory `src/events` no matter if it is outside or inside a folder to categorize them.

```ts
import { Interaction } from 'discord.js';

import Events from '../../libs/structure/Events';

export default class InteractionCreateEvent extends Events {
  name = 'interactionCreate';
  once = false;

  async execute(interaction: Interaction) {
    if (!interaction.isButton()) return;

    interaction.reply('I'm a button');
  }
}
```

<h2 align="left">How to add settings</h2>

To add settings you need to modify the following file first `src/@types/config/config.d.ts`

```ts
export interface IConfig {
  NODE_ENV: string | undefined;
  DISCORD_TOKEN: string | undefined;
  DISCORD_CLIENT_ID: string | undefined;
  DEVS_ID: string[] | undefined;
  MONGODB_URI: string | undefined;
  NEWCONFIG: string | undefined;
}
```

And then modify the following `src/config/index.ts`

```ts
const config = new Config({
  NODE_ENV: process.env.NODE_ENV,
  DISCORD_TOKEN: process.env.DISCORD_TOKEN,
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
  DEVS_ID: process.env.DEVS_ID?.split(', '),
  MONGODB_URI: process.env.MONGODB_URI,
  NEWCONFIG: process.env.NEWCONFIG,
});

export default config.getConfig();
```

<h2 align="center">Open any Issues if you notice any bugs or code enhancements.</h3>
<h3 align="left">Contact</h3>
<ul>
  <li>Discord: fantacovid19</li>
  <li>Mail: contact@mrfantasma.com</li>
</ul>
