import ConfiguredChannels from "./database/ConfiguredChannels.js";
import FlashcardCollections from "./database/FlashcardCollections.js";
import Flashcarders from "./database/Flashcarders.js";
import Flashcards from "./database/Flashcards.js";
import { IdentifiersLocalDB } from "./database/local_database/IdentifiersLocalDB.js";


/**
 * Initialises the components of the application that don't directly depend on Discord
 */
export default async function initializeApplication() {

  // Initialise database(s)
  await IdentifiersLocalDB.init();
  await Flashcards.initDatabase();
  await FlashcardCollections.initDatabase();
  await ConfiguredChannels.initDatabase();
  await Flashcarders.initDatabase();
  
}