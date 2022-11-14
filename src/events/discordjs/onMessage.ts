import { Client, TextChannel } from "discord.js";

import ConfiguredChannels from "../../database/ConfiguredChannels.js";
import Flashcards from "../../database/Flashcards.js";
import Flashcard from "../../datastructures/Flashcard.js";
import FlashcardSender from "../../interactions/flashcard_popups/FlashcardSender.js";
import GuildAllFlashcard from "../../interactions/flashcard_popups/GuildAllFlashcard.js";

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
    
    const popupProbability = ConfiguredChannels.getPopupProbaForChannel(channel.id);
    //FIXME - It's currently impossible to get flashcards since channels cannot be configured
    if(!popupProbability) // If the channel was never configured
      return;

    if(Math.random() > popupProbability) // We randomly choose to give a flashcard or not
      return;
    
    
    // Get the user's flashcards and check if there's at least one
    const flashcards:Array<Flashcard> = await Flashcards.getFlashcardsOf(msg.author.id);
    const flashcard: Flashcard|undefined = flashcards.at( Math.trunc( flashcards.length * Math.random() ) );
    if(!flashcard) { // If the user has no flashcard
      return;
    }
    
    
    // Send the flashcard
    const sender:FlashcardSender = new GuildAllFlashcard(channel, flashcard, msg.member);
    ConfiguredChannels.setFlashcardForChannel(this.channel.id, this.flashcard);
    sender.send();
    
  });
}