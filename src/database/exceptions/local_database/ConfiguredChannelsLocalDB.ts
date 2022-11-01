import { readFileSync, writeFileSync } from "fs"

import FlashcardChannel from "../../../datastructures/FlashcardChannel";


export default class ConfiguredChannelsLocalDB {

  public static load(): Map<string, FlashcardChannel> {
    //FIXME - No verification, hazardous
    
    const file = readFileSync("local_database/flashcard_channels.json").toString();
    const channelsArray = JSON.parse(file);

    const channels = channelsArray.map( el => [el[0],
      {
        uuid: el[1].uuid,
        popProbability: el[1].popProbability,
        
      }
    ]);
    
    return new Map<string, FlashcardChannel>( channels );
  }


  public static save(channelConfigs: Map<string,FlashcardChannel>): void {
    const mapArray = Array.from(channelConfigs);
    writeFileSync("local_database/flashcard_channels.json", JSON.stringify(mapArray) );
  }


}