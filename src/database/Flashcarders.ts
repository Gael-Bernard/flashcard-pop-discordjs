import Carduser, { CarduserAllopt } from "../datastructures/Carduser.js";
import CardusersLocalDB from "./local_database/CardusersLocalDB.js";





/**
 * Class giving access to the Flashcarder-s in the database
 */
export default class Flashcarders {

  /**
   * Default Carduser when creating a new Carduser
   */
  private static DEFAULT_CARDUSER: Carduser = {
    uuid: "NEVER DEFINED",
    flashcardCollections: []
  };


  /**
   * The cache containing all the Discord users
   */
  protected static cardusers: Map<string, Carduser> = new Map<string, Carduser>();


  /**
   * Adds a new user to the database with given parameters
   * @param uuid Discord UUID of the user
   * @param configuration configuration of this new Carduser
   * @returns a copy of the newly added Carduser
   */
  public static addUser(uuid:string, configuration:CarduserAllopt): Promise<Carduser> {
    return new Promise<Carduser>(success => {
    
      // Filling the configuration with default and explicit parameters
      let default_config = Object.assign({}, this.DEFAULT_CARDUSER);
      const user: Carduser = Object.assign(default_config, configuration);
      user.uuid = uuid;

      this.cardusers.set(uuid, user);
      this.saveDatabase();
      return Object.assign({}, user);

    });
  }


  /**
   * Gets a Carduser from the cache or database if they exist
   * @param uuid Discord UUID of the user
   * @returns the Carduser if they exist, undefined else
   */
  public static getUser(uuid: string): Promise<Carduser|undefined> {
    return new Promise<Carduser|undefined>(success => {

      const user = this.cardusers.get(uuid);
      if(!user)
        return undefined;
      
      return Object.assign({}, user);
    });
  }


  /**
   * Initialises the database if necessary before it can actually be used
   */
  public static async initDatabase(): Promise<void> {
    return new Promise<void>(success => {
      
      this.cardusers = CardusersLocalDB.load();

    });
  }


  /**
   * Saves all the content into the database, might be removed later
   */
  public static async saveDatabase(): Promise<void> {
    return new Promise<void>(success => {

      CardusersLocalDB.save(this.cardusers);
      success();

    });
  }


}