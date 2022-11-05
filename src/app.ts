import dotenv from "dotenv"
dotenv.config();

import { Client, Events, GatewayIntentBits } from "discord.js"

import initializeApplication from "./init.js";
import declareOnMessageResponse from "./events/discordjs/onMessage.js";
import registerCommands from "./slashcommands/cmdInit.js";


const client = new Client({intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildMessages
]});


// Whenever the bot gets online
client.once(Events.ClientReady, async c => {
  
  // Declare the functions triggered by events
  declareOnMessageResponse(client);

  // Declare/register DiscordJS commands
  registerCommands(client);

  console.log(`${new Date()} | Bot logged in as ${c.user.tag}`);
});

initializeApplication();
client.login(process.env.BOT_TOKEN);