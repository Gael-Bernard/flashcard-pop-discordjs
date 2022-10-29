import { EmbedBuilder, GuildChannel, GuildMember, TextChannel } from "discord.js";

import Flashcard from "../../datastructures/Flashcard.js";
import FlashcardSender from "../FlashcardSender.js";

/**
 * Object used to send "guild all" flashcards. 
 * This type of flashcard sent to a guild channel and can be answered by anyone
 */
export default class GuildAllFlashcard extends FlashcardSender {
  
  readonly author?: GuildMember;
  readonly channel: TextChannel;
  readonly flashcard: Flashcard;
  
  public constructor(channel:TextChannel, flashcard:Flashcard, author?:GuildMember) {
    super();

    this.author = author;
    this.channel = channel;
    this.flashcard = flashcard;
  }


  protected createFlashcardPopup(): EmbedBuilder {
  
    const description = 
        "Front of your flashcard : **"+this.flashcard.front+"**"
        +"\n\n*Type the ``/notdefinedyet [your-answer]`` command to tell me what you think is at the back!*"
    ;
    
    return new EmbedBuilder()
      .setTitle("A flashcard has popped !")
      .setDescription(description)
    ;
  }


  public send() {
    const embed:EmbedBuilder = this.createFlashcardPopup();
    this.channel.send({ embeds:[embed] });
  }

}