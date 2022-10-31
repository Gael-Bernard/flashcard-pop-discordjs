import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { SlashCommandExe } from "../rawCommands";


const configure: SlashCommandExe = {
  
  slashCommand:
    new SlashCommandBuilder().setName("configure")
    .setDescription('Bans a user from the guild.')
    .addSubcommand((subcommand) => subcommand
        .setName('probability')
        .setDescription('Change the probability that a flashcard pop up on every new message')
        .addNumberOption(option => option
            .setName("value")
            .setDescription("New probability, any number between 0% and 100% (ex: 0, 0.005, 20, 100)")
            .setMinValue(0.0)
            .setMaxValue(100.0)
            .setRequired(true)
        )
    )


  ,execute:
    function execute(interaction:ChatInputCommandInteraction) {
      interaction.reply({content: "Pong!"});
    }
}




export default configure;