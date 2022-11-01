import ConfiguredChannels from "./database/ConfiguredChannels.js";


/**
 * Initialises the components of the application that don't directly depend on Discord
 */
export default async function initializeApplication() {

  // Initialise database(s)
  await ConfiguredChannels.initDatabase();
  
}