import FlashcardCollection from "./FlashcardCollection.js";
import UserAnswers from "./UserAnswers.js";

export default interface FlashcardUser {

  /**
   * Provides Discord unique ID of this user
   * @returns Discord UUID of user as integer
   */
  getId(): number;


  /**
   * Provides the unique identifiers of all the flashcard collections owned by this user
   * @returns array of flashcard collection ID
   */
  getFlashcardCollectionIds(): Promise<number[]>;
  /**
   * Provides all the flashcard collections owned by this user
   * @returns array of FlashcardCollection belonging to user
   */
  getFlashcardCollections(): Promise<FlashcardCollection[]>;
  /**
   * Creates a new empty flashcard collection and saves to database
   * @param name Displayed name for the collection (max. 32 characters)
   * @returns new FlashcardCollection
   */
  addFlashcardCollection(name: string): Promise<FlashcardCollection>;
  /**
   * Deletes a flashcard collection belonging to user, forever
   * @param collection_id unique identifier of the flashcard collection
   * @returns "OK" if it was deleted, "NOTFOUND" if ID not found, "NOTOWNED" if the collection doesn't belong to this user
   */
  deleteFlashcardCollection(collection_id: number): Promise<"OK"|"NOTFOUND"|"NOTOWNED">;


  /**
   * Provides answer statistics of this user concerning a specified flashcard collection
   * @param collectionId ID of the searched collection
   * @returns User's statistics about this collection
   */
  getCollectionStatistics(collectionId: number): Promise<UserAnswers>;
  /**
   * Provides answer statistics of this user concerning all the flashcard collections, as long as user has answered at least one question from the collection
   * @returns User's statistics for all collections
   */
  getAllCollectionStatistics(): Promise<UserAnswers[]>;

}