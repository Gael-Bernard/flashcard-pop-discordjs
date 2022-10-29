import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { SlashCommandExe } from "../rawCommands";


const ping: SlashCommandExe = {
  
  slashCommand:
    new SlashCommandBuilder().setName("ping").setDescription("Answers *pong* to let you know the latency")

  ,execute:
    function execute(interaction:ChatInputCommandInteraction) {
      interaction.reply({content: "Pong!"});
    }
}




export default ping;