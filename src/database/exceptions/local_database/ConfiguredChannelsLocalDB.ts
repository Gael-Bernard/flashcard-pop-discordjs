import { readFileSync, writeFileSync } from "fs"

import FlashcardChannel from "../../../datastructures/FlashcardChannel";


export default class ConfiguredChannelsLocalDB {

  public static load(): Map<string, FlashcardChannel> {
    //FIXME - No verification, hazardous
    
    const file = readFileSync("local_database/flashcard_channels.json").toString();
    const raw = JSON.parse(file);

    const channels = new Array();
    raw.forEach(el => {
      
      try {
        channels.push( [el[0],
          {
            uuid: el[1].uuid,
            popProbability: el[1].popProbability,
          }
        ]);
      }
      catch(error) {
        console.error("Object could not be read from local file : ");
        console.error(el);
      } 

    });
    
    // @ts-ignore
    console.log(`Successfully loaded ${channels.length} out of ${raw.length} configured channels from local storages.`)
    return new Map<string, FlashcardChannel>( channels );
  }


  public static save(channelConfigs: Map<string,FlashcardChannel>): void {
    const mapArray = Array.from(channelConfigs);
    writeFileSync("local_database/flashcard_channels.json", JSON.stringify(mapArray) );
  }


}