import FlashcardCollection from "./FlashcardCollection";
import FlashcardUser from "./FlashcardUser";

export default interface UserAnswers {

  /**
   * Provides the total number of answers given by this user for flashcards in a specific collection
   * @returns number of given answers
   */
  getNbAnswers(): number;


  /**
   * Provides the total number of correct answers given by this user for flashcards in a specific collection
   * @returns number of correct answers
   */
  getNbCorrectAnswers(): number;
  /**
   * Increases by 1 the number of correct answers given by this user for this flashcard collection
   */
  incrementNbCorrectAnswers(): Promise<void>;


  /**
   * Provides the total number of wrong answers given by this user for flashcards in a specific collection
   * @returns number of correct answers
   */
  getNbWrongAnswers(): number;
  /**
   * Increases by 1 the number of wrong answers given by this user for this flashcard collection
   */
  incrementNbWrongAnswers(): Promise<void>;

  
  /**
   * Provides the proportion of correct answers given by user
   * @returns ratio, float value
   */
  getRatioCorrectAnswers(): number;
  
  
  /**
   * Provides the Discord unique identifier of the user concerned by these statistics
   * @returns Discord UUID, as an integer
   */
  getUserId(): number;
  /**
   * Provides the user concerned by these statistics as a FlashcardUser
   * @returns FlashcardUser instance
   */
  getUser(): Promise<FlashcardUser>;


  /**
   * Provides the unique ID of the collection concerned by these statistics
   * @returns unique identifier of the flashcard collection
   */
  getCollectionId(): number;
  /**
   * Provides the collection concerned by these statistics
   * @returns FlashcardCollection instance
   */
  getCollection(): Promise<FlashcardCollection>;

}