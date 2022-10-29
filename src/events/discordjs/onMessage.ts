import { Client, Embed, EmbedBuilder } from "discord.js";

import createFlashcardPopup from "../../bot_messages/createFlashcardPopup.js";
import getFlashcardsOf from "../../database/getFlashcards.js";
import Flashcard from "../../datastructures/Flashcard.js";

/* NOTE Messages contain an empty msg.content, because a specific intent is necessary to access the content. Though we don't need it */

/**
 * Declares the function triggered when a message is sent in the guild
 * @param client The bot's DiscordJS client
 */
export default function declareOnMessageResponse(client:Client) {
  client.on("messageCreate", msg => {
    
    if(msg.author.bot) // We only listen to users
      return;
    
    if(Math.random() < 0.5) // We randomly choose to give a flashcard or not
      return;
    
    const flashcards:Flashcard[] = getFlashcardsOf(msg.author.id);
    if(flashcards.length == 0) { // If the user has no flashcard
      return;
    }
    
    // Pick random flashcard
    const flashcard:Flashcard = flashcards.at( Math.trunc( flashcards.length * Math.random() ) );
    
    // Display
    const embed:EmbedBuilder = createFlashcardPopup(flashcard);
    msg.reply({ embeds:[embed] });
  });
}