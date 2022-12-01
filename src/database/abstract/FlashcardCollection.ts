import Flashcard from "./Flashcard.js";
import FlashcardUser from "./FlashcardUser";
import UserAnswers from "./UserAnswers.js";

export default interface FlashcardCollection {

  /**
   * Provides the unique identifier of this collection
   * @returns identifier as integer
   */
  getId(): number;
  

  /**
   * Provides the size of the collection, i.e the number of flashcards in this collection
   * @returns number of flashcards
   */
  getSize(): number;


  /**
   * Provides the flashcard at given index
   * @param index index of the flashcard in the collection
   * @returns the flashcard if any, undefined else
   */
  getFlashcardAt(index: number): Promise<Flashcard|undefined>;
  /**
   * Provides the unique identifiers of all the flashcards contained in this flashcard collection
   * @returns array of identifiers as integers
   */
  getAllFlashcardIds(): Promise<number[]>;
  /**
   * Provides all the flashcards in the collection
   * @returns array of flashcards
   */
  getAllFlashcards(): Promise<Flashcard[]>;
  /**
   * Creates a new flashcard, adds it to this collection and saves in database
   * @param question question at the front of the flashcard, contained in a string
   * @param answers possible answers at the back of the flashcard, contained in string in the "answers" array
   * @returns the newly created Flashcard
   */
  addFlashcard(question: string, answers: string[]): Promise<Flashcard>;
  /**
   * Removes a flashcard from this collection and updates the database accordingly
   * @param id unique identifier of the flashcard
   * @returns "OK" if it worked, "NOTFOUND" if the flashcard was not found in database
   */
  removeFlashcard(id: number): Promise<"OK"|"NOTFOUND">;


  /**
   * Provides the Discord ID of the owner of this collection
   * @returns unique Discord identifier, as an integer
   */
  getOwnerId(): number;
  /**
   * Provides the owner of the owner, as an instance of FlashcardUser
   * @returns owner of flashcard
   */
  getOwner(): Promise<FlashcardUser>;
  /**
   * Changes the owner of this flashcard collection and updates the database accordingly
   * @param uuid Discord unique ID of the new owner
   */
  setOwnerId(uuid: number): Promise<void>;


  /**
   * Provides the statistics of a user for this collection
   * @param uuid Discord unique identifier of the user, as integer
   * @returns user statistics, as UserAnswers
   */
  getUserStatistics(uuid: number): Promise<UserAnswers>;
  /**
   * Provides the statistics of all users for this array
   * @returns Statistics of all users for this collection, as a UserAnswers array
   */
  getAllUserStatistics(): Promise<UserAnswers[]>;

}