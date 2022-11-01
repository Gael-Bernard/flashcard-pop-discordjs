import dotenv from "dotenv"
dotenv.config();

import { Client, Events, GatewayIntentBits } from "discord.js"

import declareOnMessageResponse from "./events/discordjs/onMessage.js";
import registerCommands from "./commands copy/cmdInit.js";
import ConfiguredChannels from "./database/ConfiguredChannels.js";


const client = new Client({intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages
]});


// Whenever the bot gets online
client.once(Events.ClientReady, async c => {
  console.log(`${new Date()} | Bot logged in as ${c.user.tag}`);

  // Declare the functions triggered by events
  declareOnMessageResponse(client);

  // Declare/register DiscordJS commands
  registerCommands(client);

  // Initialise database(s)
  await ConfiguredChannels.initDatabase();
});


client.login(process.env.BOT_TOKEN);