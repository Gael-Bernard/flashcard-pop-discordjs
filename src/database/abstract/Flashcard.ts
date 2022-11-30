import FlashcardCollection from "./FlashcardCollection";
import FlashcardUser from "./FlashcardUser";

export default interface Flashcard {

  /**
   * Provides the unique identifier of the flashcard
   * @returns identifier as integer
   */
  getId(): number;


  /**
   * Provides the question of the flashcard
   * @returns string containing the question
   */
  getQuestion(): string;
  /**
   * Edits the question of this flashcard and updates database
   * @param newQuestion new question (max. 128 characters)
   */
  setQuestion(newQuestion: string): Promise<void>;

  
  /**
   * Provides one of the answers to the flashcard's question
   * @param index index of the answer among the flashcard's possible answers
   * @returns a string containing the required answer
   */
  getAnswerAt(index: number): string|undefined;
  /**
   * Adds a new answer to the flashcard's question and registers it in the database
   * @param newAnswer the new answer as string
   */
  addAnswer(newAnswer: string): Promise<void>;
  /**
   * Provides all the known answers to the flashcard's question
   * @returns an array of strings, each one containing one answer to the question
   */
  getAnswers(): string[];
  /**
   * Edits the list of answers to a flashcard's question
   * @param newAnswers array containing the new set of answers
   */
  setAnswers(newAnswers: string[]): Promise<void>;
  
  
  /**
   * Provides the date when the flashcard was created
   * @returns creation date, as Date object
   */
  getCreationDate(): Date;
  
  
  /**
   * Provides the unique identifier of the collection containing this flashcard
   * @returns identifier of the collection as an integer
   */
  getCollectionId(): Promise<number>;
  /**
   * Provides the collection containing this flashcard
   * @returns collection as FlashcardCollection
   */
  getCollection(): Promise<FlashcardCollection>;

}