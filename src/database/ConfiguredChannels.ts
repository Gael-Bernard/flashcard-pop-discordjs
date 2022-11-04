import Flashcard from "../datastructures/Flashcard.js";
import FlashcardChannel, { FlashcardChannelAllopt } from "../datastructures/FlashcardChannel.js";
import { ChannelNotConfiguredError } from "./exceptions/ConfiguredChannelsError.js";
import ConfiguredChannelsLocalDB from "./local_database/ConfiguredChannelsLocalDB.js";


/**
 * Manages the currently active channels and their flashcards
 */
export default class ConfiguredChannels {

  private static DEFAULT_FLASHCARDCHANNEL: FlashcardChannel = {
    uuid: "NEVER DEFINED",
    popProbability: 0.02,
    currentFlashcard: undefined,
    collections: []
  };


  protected static configuredChannels: Map<string, FlashcardChannel> = new Map<string, FlashcardChannel>();


  /**
   * Configures a new channel, making it available in the database
   * @param uuid channel UUID
   * @param probability Probability for popup flashcards in the channel
   */
  public static configureChannel(uuid:string, configuration:FlashcardChannelAllopt): FlashcardChannel {
    
    // Filling the configuration with default and explicit parameters
    let default_config = Object.assign({}, this.DEFAULT_FLASHCARDCHANNEL);
    const channel: FlashcardChannel = Object.assign(default_config, configuration);
    channel.uuid = uuid;

    this.configuredChannels.set(uuid, channel);
    this.saveDatabase();
    return Object.assign({}, channel);
  }


  /**
   * Gets the current active channel by UUID
   * @param uuid channel ID
   * @returns information about the channel, or undefined if this channel wasn't defined
   */
  public static getChannel(uuid:string): FlashcardChannel|undefined {
    const channel = this.configuredChannels.get(uuid);
    if(!channel)
      return undefined;
    
    return Object.assign({}, channel);
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
   * @param flashcard new flashcard
   * @throws ChannelNotConfiguredError
   */
  public static setFlashcardForChannel(uuid:string, flashcard:Flashcard): void {
    
    const channel = this.configuredChannels.get(uuid);
    if(!channel)
      throw new ChannelNotConfiguredError(uuid);

    channel.currentFlashcard = Object.assign({}, flashcard);
    this.saveDatabase();
  }


  /**
   * Removes the current active flashcard from the specified channel
   * @param uuid channel UUID
   * @returns false if the channel did not have a flashcard, true if it did and the flashcard was removed
   */
  public static clearChannelFromFlashcard(uuid:string): boolean {
    
    const channel = this.configuredChannels.get(uuid);
    if(!channel)
      return false;
    
    channel.currentFlashcard = undefined;
    this.saveDatabase();
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
   * Redefines the probability that a flashcard pops up in the specified channel
   * @param uuid channel UUID
   * @param probability number between 0 and 1
   * @throws ChannelNotConfiguredError
   */
  public static setPopupProbaForChannel(uuid:string, probability:number): void {
    
    const channel = this.configuredChannels.get(uuid);
    if(!channel)
      throw new ChannelNotConfiguredError(uuid);
    
    channel.popProbability = probability;
    this.saveDatabase();
  }


  /**
   * Initialises the database if necessary before it can actually be used
   */
  public static async initDatabase(): Promise<void> {
    return new Promise<void>(success => {
      
      this.configuredChannels = ConfiguredChannelsLocalDB.load();

    });
  }


  public static async saveDatabase(): Promise<void> {
    return new Promise<void>(success => {

      ConfiguredChannelsLocalDB.save(this.configuredChannels);
      success();

    });
  }


}