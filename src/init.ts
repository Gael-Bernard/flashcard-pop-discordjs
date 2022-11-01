import ConfiguredChannels from "./database/ConfiguredChannels.js";
import { IdentifiersLocalDB } from "./database/local_database/IdentifiersLocalDB.js";


/**
 * Initialises the components of the application that don't directly depend on Discord
 */
export default async function initializeApplication() {

  // Initialise database(s)
  await IdentifiersLocalDB.init();
  await ConfiguredChannels.initDatabase();
  
}