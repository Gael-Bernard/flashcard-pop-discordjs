import { readFileSync, writeFileSync } from "fs"

import FlashcardChannel, { FlashcardChannelForDB } from "../../datastructures/FlashcardChannel.js";
import FlashcardCollection from "../../datastructures/FlashcardCollection.js";
import FlashcardCollectionNotFoundError from "../exceptions/FlashcardCollectionNotFoundError.js";
import FlashcardCollections from "../FlashcardCollections.js";


export default class ConfiguredChannelsLocalDB {

  public static load(): Map<string, FlashcardChannel> {
    
    const file = readFileSync("local_database/flashcard_channels.json").toString();
    const raw = JSON.parse(file);

    const channels: [string,FlashcardChannel][] = new Array();
    raw.forEach(el => {
      
      try {
        channels.push( [el[0],
          {
            uuid: el[1].uuid,
            popProbability: el[1].popProbability,
            collections: el[1].collections.map(uuid => errorIfUndefinedCollection(uuid)) // get collection from UUID
          }
        ]);
      }
      catch(error) {
        console.error("Object could not be read from local file : ");
        console.error(el);
      } 

    });
    
    console.log(`Successfully loaded ${channels.length} out of ${raw.length} configured channels from local storages.`)
    return new Map<string, FlashcardChannel>( channels );
  }


  public static save(channelConfigs: Map<string,FlashcardChannel>): void {
    const mapArray: [string,FlashcardChannel][] = Array.from(channelConfigs);
    const mapArrayWithoutFlashcard: [string,FlashcardChannelForDB][] = mapArray.map(couple => { return [ couple[0], {
        uuid: couple[1].uuid,
        popProbability: couple[1].popProbability,
        collections: couple[1].collections.map(fc => fc.uuid)
      }]
    });
    writeFileSync("local_database/flashcard_channels.json", JSON.stringify(mapArrayWithoutFlashcard) );
  }


}



async function errorIfUndefinedCollection(uuid: string): Promise<FlashcardCollection> {
  
  const collection = await FlashcardCollections.getCollection(uuid);
  if(!collection)
    throw new FlashcardCollectionNotFoundError(uuid);

  return collection;
}