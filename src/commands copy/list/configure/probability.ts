import { ChatInputCommandInteraction } from "discord.js";

import ConfiguredChannels from "../../../database/ConfiguredChannels.js";

export default function executeProbability(interaction: ChatInputCommandInteraction): void {
  
  const probability = interaction.options.getNumber("value");
  if(!probability) {
    interaction.reply({content: "Error: The input probability could not be read", ephemeral:true});
    return;
  }
  const normalizedProba = probability / 100.0;

  const uuid = interaction.channel?.id;
  if(!uuid) {
    interaction.reply({content: "Error: Channel not found", ephemeral:true});
    return;
  }

  const channel = ConfiguredChannels.getChannel(uuid);
  if(channel) {
    ConfiguredChannels.setPopupProbaForChannel(uuid, normalizedProba);
    interaction.reply({content: `Successfully set the flashcard popup probability to ${probability}% for this channel!`, ephemeral:false});
  }

  else {
    ConfiguredChannels.configureChannel(uuid, {popProbability: normalizedProba});
    interaction.reply({content: `Successfully configured this channel to make flashcards pop up, with probability ${probability}% !`, ephemeral:false});
  }

}