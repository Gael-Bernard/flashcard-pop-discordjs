/**
 * Represents a flashcard, with text on the front and back
 */
 type Flashcard = {
  uuid: string,
  front: string,
  back: string[] // Multiple possible answers
}

export default Flashcard;


/**
 * Flashcard but every field is optional, to complete a regular Flashcard object
 */
export type FlashcardAllopt = {
  front?: string,
  back?: string[]
}


/**
 * Data of a Flashcard stored in the database
 */
export type FlashcardForDB = {
  uuid: string,
  front: string,
  back: string[]
}
