import { FlashcardChannelAllopt } from "../datastructures/FlashcardChannel";
import FlashcardCollection from "../datastructures/FlashcardCollection.js";
import FlashcardCollectionsLocalDB from "./local_database/FlashcardCollectionsLocalDB.js";
import { IdentifiersLocalDB } from "./local_database/IdentifiersLocalDB";

/**
 * All the methods to access collections of flashcards
 */
export default class FlashcardCollections {

  /**
   * Map storing the cached flashcard collections
   */
  private static collections: Map<string,FlashcardCollection> = new Map<string,FlashcardCollection>();


  private static DEFAULT_FLASHCARDCOLLECTION: FlashcardCollection = {
    uuid: "NEVER DEFINED",
    flashcards: []
  }


  /**
   * Creates a new flashcard collection with given parameters
   * @param configuration 
   * @returns 
   */
  public static addCollection(configuration: FlashcardChannelAllopt): Promise<FlashcardCollection>  {
    return new Promise<FlashcardCollection>(() => {
   
      // Filling the configuration with default and explicit parameters
      let default_config = Object.assign({}, this.DEFAULT_FLASHCARDCOLLECTION);
      const collection: FlashcardCollection = Object.assign(default_config, configuration);
      collection.uuid = IdentifiersLocalDB.generateFlashcardCollectionId();

      this.collections.set(collection.uuid, collection);
      this.saveDatabase();
      return Object.assign({}, collection);

    });
  }

  
  /**
   * Gets a collection by UUID from the database
   * @param uuid flashcards collection UUID
   * @returns the flashcard if found, undefined if it doesn't exist
   */
  public static getCollection(uuid: string): Promise<FlashcardCollection|undefined> {
    return new Promise<FlashcardCollection|undefined>(success => {

      return this.collections.get(uuid);

    });
  }



  /**
   * Initialises the database if necessary before it can actually be used
   */
  public static async initDatabase(): Promise<void> {
    return new Promise<void>(success => {
        
      this.collections = FlashcardCollectionsLocalDB.load();
  
    });
  }
  
  
  /**
   * Saves the currently cached data into the database
   * @returns
   */
  public static async saveDatabase(): Promise<void> {
    return new Promise<void>(success => {

      FlashcardCollectionsLocalDB.save(this.collections);

    });
  }

  


}