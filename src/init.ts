import ConfiguredChannels from "./database/ConfiguredChannels.js";
import { Identifiers } from "./database/Identifiers.js";


/**
 * Initialises the components of the application that don't directly depend on Discord
 */
export default async function initializeApplication() {

  // Initialise database(s)
  await Identifiers.init();
  await ConfiguredChannels.initDatabase();
  
}