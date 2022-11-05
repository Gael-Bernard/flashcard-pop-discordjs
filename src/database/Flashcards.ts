import Flashcard from "../datastructures/Flashcard.js";
import FlashcardsLocalDB from "./local_database/FlashcardsLocalDB.js";
import { IdentifiersLocalDB } from "./local_database/IdentifiersLocalDB.js";


/**
 * All the methods to access flashcards stored for each user
 */
export default class Flashcards {

  private static flashcards: Map<string,Flashcard> = new Map<string,Flashcard>();


  /**
   * Creates a new flashcard and adds it to the database
   * @param front front of the new flashcard
   * @param back back of the new flashcard
   * @returns a copy of the newly created flashcard
   */
  public static async addFlashcard(front: string, back: string[]): Promise<Flashcard> {
    return new Promise<Flashcard>(success => {

      const flashcard: Flashcard = {
        uuid: IdentifiersLocalDB.generateFlashcardId(),
        front: front,
        back: [...back]
      }

      this.flashcards.set(flashcard.uuid, flashcard);
      success( Object.assign({}, flashcard) );
    });
  }


  /**
   * Provides a stored flashcard by its UUID
   * @param uuid flashcard UUID
   * @returns the required flashcard if it exists, undefined if it was not found
   */
  public static async getFlashcard(uuid: string): Promise<Flashcard|undefined> {
    return new Promise<Flashcard|undefined>(success => {
      
      const flashcard = this.flashcards.get(uuid);
      if(!flashcard)
        return undefined;

      success( Object.assign({}, flashcard) );

    });
  }






  /**
   * Initialises the database if necessary before it can actually be used
   */
   public static async initDatabase(): Promise<void> {
    return new Promise<void>(success => {
      
      this.flashcards = FlashcardsLocalDB.load();

    });
  }


  /**
   * Saves the currently cached data into the database
   * @returns
   */
  public static async saveDatabase(): Promise<void> {
    return new Promise<void>(success => {

      FlashcardsLocalDB.save(this.flashcards);
      success();

    });
  }


  /**
   * Gets all the flashcards of a user by UUID
   * @param uuid user UUID
   * @returns An array of Flashcard
   */
  public static getFlashcardsOf(uuid:string) :Promise<Array<Flashcard>> {
    return new Promise( success => {
      
      success([
        { front: "Hi in French", back:["Salut", "Bonjour"], uuid: "0" },
        { front: "Yo in French", back: ["Yo"], uuid:"1" },
        { front: "Name of the Typescript loop with a predetermined number of loops", back: ["for"], uuid:"2" },
        { front: "Keyword to declare a variable (a box yay) in Typescript", back: ["let", "var"], uuid:"3" }
      ]);
    
    });
  }


}