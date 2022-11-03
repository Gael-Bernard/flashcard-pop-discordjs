
import { REST } from "@discordjs/rest"
import { Routes } from "discord-api-types/v10"
import { Client } from "discord.js";

import cmdRegistry from "./cmdRegistry.js";
import rawCommands from "./rawCommands.js";



export default async function registerCommands(client:Client) {
  console.log('Registering commands : Start');

  await registerToDiscord(client);
  await registerToCmdRegistry();
  declareCommandProcessing(client);

  console.log('Registering commands : End');
}


async function registerToDiscord(client:Client) {
  // @ts-ignore
	const token:string = process.env.BOT_TOKEN;
	const rest = new REST({ version: '10' }).setToken(token);
	
	console.log('Registering slash commands to Discord...');
	// @ts-ignore
	const botDiscordId:string = client.user.id;
  const commands = rawCommands.map(c => c.slashCommand);
	const result = await rest.put(Routes.applicationCommands(botDiscordId), { body: commands });
  // @ts-ignore
	console.log(`\nSuccessfully registered ${commands.length} slash commands to Discord :\n${commands.reduce( (val,c) => val+"- "+c.name+"\n", "")}`);
}


async function registerToCmdRegistry() {
  
  console.log(`Registering commands in the bot's commands registry`);
  rawCommands.forEach(cmd => {
    // @ts-ignore
    const name = cmd.slashCommand.name;
    console.log(`Registering command ${name}...`);
    cmdRegistry[name] = cmd;
  });
  console.log(`Successfully registered commands.`);
}


function declareCommandProcessing(client:Client) {
  client.on("interactionCreate", async interaction => {
    if (!interaction.isChatInputCommand()) return;
  
    const commandName = interaction.commandName;
    const cmd = cmdRegistry[commandName];
  
    if(!cmd) {
      interaction.reply({content: `Sorry, the *${commandName}* command could not be found in the registry.`, ephemeral:true});
      return;
    }
    
    cmd.execute(interaction);
  });
}
