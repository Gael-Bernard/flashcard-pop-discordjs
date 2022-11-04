import FlashcardCollection from "../datastructures/FlashcardCollection";

/**
 * All the methods to access collections of flashcards
 */
export default class FlashcardCollections {

  /**
   * Map storing the cached flashcard collections
   */
  private static collections: Map<string,FlashcardCollection> = new Map<string,FlashcardCollection>();


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

  


}