import dotenv from "dotenv"
dotenv.config();

import { Client, Events, GatewayIntentBits } from "discord.js"

import declareOnMessageResponse from "./messageEvent/onMessage";


const client = new Client({intents: [
  GatewayIntentBits.GuildMessages
]})


// Whenever the bot gets online
client.once(Events.ClientReady, c => {
  console.log(`${new Date()} | Bot logged in as ${c.user.tag}`);

  // Declare the functions triggered by events
  declareOnMessageResponse(client);
});


client.login(process.env.BOT_TOKEN);