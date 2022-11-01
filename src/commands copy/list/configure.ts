import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";

import { SlashCommandExe } from "../rawCommands.js";
import executeProbability from "./configure/probability.js";


const configure: SlashCommandExe = {
  
  slashCommand:
    new SlashCommandBuilder().setName("configure")
    .setDescription('Bans a user from the guild.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)

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
      const subcommand: string = interaction.options.getSubcommand();

      if(subcommand === "probability") {
        executeProbability(interaction);
      }

      else {
        interaction.reply(`Error: unknown subcommand ${subcommand}`);
      }

    }
}




export default configure;