import Flashcard from "./Flashcard.js"


/**
 * Group of flashcards, used to keep flashcards tidy and make channels use them instead of individual cards
 */
type FlashcardCollection = {
  uuid: string,
  flashcards: Flashcard[]
}

export default FlashcardCollection;


/**
 * FlashcardCollection but every field is optional, to complete a regular FlashcardCollection object
 */
export type FlashcardCollectionAllopt = {
  flashcards?: Flashcard[]
}


/**
 * Data of a FlashcardCollection stored in the database
 */
export type FlashcardCollectionForDB = {
  uuid: string,
  flashcards: string[]
}


