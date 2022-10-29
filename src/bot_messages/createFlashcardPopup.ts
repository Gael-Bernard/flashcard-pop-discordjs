import { EmbedBuilder } from "@discordjs/builders";
import Flashcard from "../datastructures/Flashcard";

export default function createFlashcardPopup(flashcard:Flashcard): EmbedBuilder {
  
  const description = 
      "Front of your flashcard : "+flashcard.front
      +"\n*Type the ``/notdefinedyet []`` command to tell me what you think is on the back!*"
  ;
  
  return new EmbedBuilder()
    .setTitle("A flashcard has popped !")
    .setDescription(description)
  ;
}