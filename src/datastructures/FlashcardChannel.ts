import Flashcard from "./Flashcard.js"


/**
 * Data of a FlashcardChannel stored in the database
 */
type FlashcardChannelForDB = {
  uuid: string,
  popProbability: number
}


/**
 * Type containing the information about a channel (ID, popup probability)
 */
 type FlashcardChannel = FlashcardChannelForDB & {
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
