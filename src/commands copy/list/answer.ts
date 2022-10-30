import { ChatInputCommandInteraction, SlashCommandBuilder, TextBasedChannel } from "discord.js";

import ActiveChannels from "../../database/ActiveChannels.js";
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

      const flashcard: Flashcard|undefined = ActiveChannels.getFlashcardForChannel(channel.id);
      if(!flashcard) { // If the channel doesn't have an active flashcard
        interaction.reply({content: "This channel doesn't have any active flashcard!"});
        return;
      }
      
      const guess: string|null = interaction.options.getString("guess");
      if(!guess) {
        interaction.reply({content: "Error : No guess provided.", ephemeral:true});
        return;
      }
      
      if(guess.toLowerCase() == flashcard.back.toLowerCase()) {
        interaction.reply({content: `You are right, it was **${flashcard.back}** ! Congratulations ${interaction.user} !`});
        ActiveChannels.clearChannelFromFlashcard(channel.id);
      }
      else {
        interaction.reply({content: `Unfortunately, your guess **${guess}** was wrong :(\nTry again !`});
      }
      
    }
}


export default answer;