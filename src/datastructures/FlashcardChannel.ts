import Flashcard from "./Flashcard.js"


/**
 * Type containing the information about a channel (ID, popup probability)
 */
 type FlashcardChannel = {
  uuid: string,
  popProbability: number,
  currentFlashcard?: Flashcard
};
export default FlashcardChannel;


/**
 * Members of FlashcardChannel that can be defined by default
 */
 export type FlashcardChannelAllopt = {
  popProbability?: number,
  currentFlashcard?: Flashcard
};
