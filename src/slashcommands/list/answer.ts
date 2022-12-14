import { ChatInputCommandInteraction, SlashCommandBuilder, TextBasedChannel } from "discord.js";

import ConfiguredChannels from "../../database/ConfiguredChannels.js";
import Flashcard from "../../datastructures/Flashcard.js";
import { SlashCommandExe } from "../rawCommands.js";

const answer: SlashCommandExe = {
  
  slashCommand:
    new SlashCommandBuilder().setName("answer")
        .setDescription("Try guessing the word or expression at the back of the flashcard!")
        .addStringOption(option =>
          option.setName("guess").setDescription("What you think is at the back of the flashcard !")
          .setRequired(true)
        )

  ,execute:
    function execute(interaction:ChatInputCommandInteraction) {
      
      const channel: TextBasedChannel|null = interaction.channel;
      if(!channel) // If there's no channel
        return;

      const flashcard: Flashcard|undefined = ConfiguredChannels.getFlashcardForChannel(channel.id);
      if(!flashcard) { // If the channel doesn't have an active flashcard
        interaction.reply({content: "This channel doesn't have any active flashcard!", ephemeral:true});
        return;
      }
      
      const guess: string|null = interaction.options.getString("guess");
      if(!guess) {
        interaction.reply({content: "Error : No guess provided.", ephemeral:true});
        return;
      }
      
      if( flashcard.back.some(solution => solution.toLocaleLowerCase() === guess.toLowerCase()) ) {
        interaction.reply({content: `You are right, it was **${guess}** ! Congratulations ${interaction.user} !`});
        ConfiguredChannels.clearChannelFromFlashcard(channel.id);
      }
      else {
        interaction.reply({content: `Unfortunately, your guess **${guess}** was wrong :(\nTry again !`});
      }
      
    }
}


export default answer;