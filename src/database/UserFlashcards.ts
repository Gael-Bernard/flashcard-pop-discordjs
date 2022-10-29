import Flashcard from "../datastructures/Flashcard.js";


/**
 * All the methods to access flashcards stored for each user
 */
export default class UserFlashcards {

  /**
   * Gets all the flashcards of a user by UUID
   * @param uuid user UUID
   * @returns An array of Flashcard
   */
  public static getFlashcardsOf(uuid:string) :Promise<Array<Flashcard>> {
    return new Promise( success => {
      
      success([
        { front: "Salut", back:"Hi" },
        { front: "Bonjour", back: "*Good morning* in the morning, *good afternoon* on the afternoon" }
      ]);
    
    });
  }


}