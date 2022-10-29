import { Client, TextChannel } from "discord.js";

import UserFlashcards from "../../database/UserFlashcards.js";
import Flashcard from "../../datastructures/Flashcard.js";
import FlashcardSender from "../../interactions/FlashcardSender.js";
import GuildAllFlashcard from "../../interactions/guild_all_flashcard_popup/GuildAllFlashcard.js";

/* NOTE Messages contain an empty msg.content, because a specific intent is necessary to access the content. Though we don't need it */

/**
 * Declares the function triggered when a message is sent in the guild
 * @param client The bot's DiscordJS client
 */
export default function declareOnMessageResponse(client:Client) {
  client.on("messageCreate", async (msg) => {

    if(msg.author.bot) // We only listen to users
      return;
    
    const channel = msg.channel;
    if( !(channel instanceof TextChannel) ) // Leave if not a text channel
      return;
    
    if(!msg.member) // Leave if not in a guild
      return;
    
    if(Math.random() < 0.5) // We randomly choose to give a flashcard or not
      return;
    
    
    // Get the user's flashcards and check if there's at least one
    const flashcards:Array<Flashcard> = await UserFlashcards.getFlashcardsOf(msg.author.id);
    const flashcard: Flashcard|undefined = flashcards.at( Math.trunc( flashcards.length * Math.random() ) );
    if(!flashcard) { // If the user has no flashcard
      return;
    }
    
    
    // Send the flashcard
    const sender:FlashcardSender = new GuildAllFlashcard(channel, flashcard, msg.member);
    sender.send();
    
  });
}