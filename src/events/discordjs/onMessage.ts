import { Client } from "discord.js";

/**
 * Declares the function triggered when a message is sent in the guild
 * @param client The bot's DiscordJS client
 */
export default function declareOnMessageResponse(client:Client) {
  client.on("messageCreate", msg => {
    
    if(msg.author.bot)
      return;
    
    console.log("Content : "+msg.content+" auth: "+msg.author); // Message not displayed because a 3rd intent is necessary. Though we don't need it
    
    
    
  });
}