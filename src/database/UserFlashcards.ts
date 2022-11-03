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
        { front: "Hi in French", back:["Salut", "Bonjour"], uuid: "0" },
        { front: "Yo in French", back: ["Yo"], uuid:"1" },
        { front: "Name of the Typescript loop with a predetermined number of loops", back: ["for"], uuid:"2" },
        { front: "Keyword to declare a variable (a box yay) in Typescript", back: ["let", "var"], uuid:"3" }
      ]);
    
    });
  }


}