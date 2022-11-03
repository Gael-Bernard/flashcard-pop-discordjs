import { SlashCommandExe } from "./rawCommands.js";


export interface ExecutableCommandBuilders {
  [name: string] : SlashCommandExe
}

/**
 * Hashmap of all the registered command names, associated to the raw command and its execution function.
 * Needs to be initialised by the init function.
 */
const cmdRegistry: ExecutableCommandBuilders = {};
export default cmdRegistry;