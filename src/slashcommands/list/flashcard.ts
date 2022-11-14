import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

import { SlashCommandExe } from "../rawCommands";
import executeList from "./flashcard/list";


const flashcard: SlashCommandExe = {
  
  slashCommand:
    new SlashCommandBuilder().setName("flashcard").setDescription("Manage your flashcards")
      .addSubcommand(subcommand => subcommand
        .setName("list").setDescription("Displays the list of your flashcard collections")  
      )

  ,execute:
    function execute(interaction:ChatInputCommandInteraction) {
      
      const subcommand = interaction.options.getSubcommand();

      if(subcommand === "list")
        executeList(interaction);

    }
}




export default flashcard;