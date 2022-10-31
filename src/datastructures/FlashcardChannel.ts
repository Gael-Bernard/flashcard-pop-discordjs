import Flashcard from "./Flashcard.js"

/**
 * Type containing the information about a channel (ID, popup probability)
 */
type FlashcardChannel = {
  uuid: string,
  popProbability: number,
  currentFlashcard?: Flashcard
}


export default FlashcardChannel;