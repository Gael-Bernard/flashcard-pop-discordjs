import { SharedSlashCommandOptions, SlashCommandBuilder } from "discord.js";

import answer from "./list/answer.js";
import configure from "./list/configure.js";
import ping from "./list/ping.js";


/**
 * Pair of SlashCommandBuilder and function to execute when the command is called.
 * Used to declare commands in src/commands/list
 */
 export type SlashCommandExe = {
  slashCommand: SlashCommandBuilder | SharedSlashCommandOptions | unknown,
  execute: (ChatInputCommandInteraction) => void
};


/**
 * List of SlashCommandBuilder, that will have to be registered by the init function.
 */
const rawCommands: SlashCommandExe[] = [
  ping,
  answer,
  configure
]
export default rawCommands;

