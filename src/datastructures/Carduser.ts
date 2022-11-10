import FlashcardCollection from "./FlashcardCollection.js";

/**
 * Discord user, owning flashcards
 */
type Carduser = {
  uuid: string,
  flashcardCollections: FlashcardCollection[]
}

export default Carduser;


/**
 * Carduser with flashcards but every field is optional, to complete a regular Carduser object
 */
export type CarduserAllopt = {
  flashcardCollections?: FlashcardCollection[]
}


/**
 * Data of a Carduser stored in the database
 */
export type CarduserForDB = {
  uuid: string,
  flashcardCollections: string[]
}


