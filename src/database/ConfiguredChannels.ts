import Flashcard from "../datastructures/Flashcard.js";
import FlashcardChannel from "../datastructures/FlashcardChannel.js";


/**
 * Manages the currently active channels and their flashcards
 */
export default class ConfiguredChannels {

  static readonly DEFAULT_POPUP_PROBABILITY = 0.02;


  protected static channelFlashcards: Map<string, FlashcardChannel> = new Map<string, FlashcardChannel>();


  /**
   * Creates a new FlashcardChannel when a necessary one could not be found
   * @param uuid channel UUID
   * @param probability Probability for popup flashcards in the channel
   */
  private static activateChannel(uuid:string, probability:number): FlashcardChannel {
    
    const channel: FlashcardChannel = {
      uuid,
      popProbability: probability
    };

    this.channelFlashcards.set(uuid, channel);
    return channel;
  }


  /**
   * Gets the current active channel by UUID
   * @param uuid channel ID
   * @returns information about the channel, or undefined if this channel wasn't defined
   */
  public static getChannel(uuid:string): FlashcardChannel|undefined {
    return this.channelFlashcards.get(uuid);
  }


  
  /**
   * Gets the current active flashcard in a channel if any
   * @param uuid channel UUID
   * @returns the current active FlashCard
   */
  public static getFlashcardForChannel(uuid:string): Flashcard|undefined {
    const flashcard = this.getChannel(uuid)?.currentFlashcard;
    
    if(!flashcard)
      return undefined;

    return Object.assign({}, flashcard);
  }


  /**
   * Sets or replaces the active flashcard of a channel
   * @param uuid channel UUID
   * @param flashcard 
   */
  public static setFlashcardForChannel(uuid:string, flashcard:Flashcard): void {
    const channel = this.getChannel(uuid);
    
    if(channel) {
      channel.currentFlashcard = Object.assign({}, flashcard);
    }
    else {
      const newChannel = this.activateChannel(uuid, this.DEFAULT_POPUP_PROBABILITY);
      newChannel.currentFlashcard = Object.assign({}, flashcard);
    }
      
  }


  /**
   * Removes the current active flashcard from the specified channel
   * @param uuid channel UUID
   * @returns false if the channel did not have a flashcard, true if it did and the flashcard was removed
   */
  public static clearChannelFromFlashcard(uuid:string): boolean {
    
    const channel = this.getChannel(uuid);
    if(!channel)
      return false;
    
    channel.currentFlashcard = undefined;
    return true;
  }

  
  /**
   * Gets the probability for a flashcard to pop up on every message in the specified channel
   * @param uuid channel UUID
   * @returns probability between 0 and 1, or undefined if the channel was not configured
   */
  public static getPopupProbaForChannel(uuid:string): number|undefined {
    return this.getChannel(uuid)?.popProbability;
  }


  /**
   * Defines or redefines the probability that a flashcard pops up in the specified channel
   * @param uuid channel UUID
   * @param probability number between 0 and 1
   */
  public static setPopupProbaForChannel(uuid:string, probability:number): void {
    
    const channel = this.getChannel(uuid);
    
    if(channel) {
      channel.popProbability = probability;
    }

    else {
      this.activateChannel(uuid, probability);
    }
  }


}