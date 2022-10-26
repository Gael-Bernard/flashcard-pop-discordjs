import dotenv from "dotenv"
dotenv.config();

import { Client, Events, GatewayIntentBits } from "discord.js"

const client = new Client({intents: [
  GatewayIntentBits.GuildMessages
]})


client.once(Events.ClientReady, c => {
  console.log(`${new Date()} | Bot logged in as ${c.user.tag}`);
});


client.login(process.env.BOT_TOKEN);