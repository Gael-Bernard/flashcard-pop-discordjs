import Flashcard from "../datastructures/Flashcard";


/**
 * Manages the currently active flashcard in each channel, storing in a dictionary
 */
export default class ActiveChannels {

  public static channelFlashcards: Map<string, Flashcard> = new Map<string, Flashcard>();
  
  /**
   * Gets the current active flashcard in a channel if any
   * @param uuid channel UUID
   * @returns the current active FlashCard
   */
  public static getFlashcardForChannel(uuid:string): Flashcard|undefined {
    return this.channelFlashcards.get(uuid);
  }


  /**
   * Sets or replaces the active flashcard of a channel
   * @param uuid channel UUID
   * @param flashcard the new active Flashcard
   */
  public static setFlashcardForChannel(uuid:string, flashcard:Flashcard) {
    this.channelFlashcards.set(uuid, flashcard);
  }


  /**
   * Removes the current active flashcard from the specified channel
   * @param uuid channel UUID
   * @returns false if the channel did not have a flashcard, true if it did and the flashcard was removed
   */
  public static clearChannelFromFlashcard(uuid:string): boolean {
    return this.channelFlashcards.delete(uuid);
  }


}