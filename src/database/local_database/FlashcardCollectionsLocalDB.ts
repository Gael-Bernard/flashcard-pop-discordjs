import { readFileSync, writeFileSync } from "fs"
import Flashcard from "../../datastructures/Flashcard";

import FlashcardCollection, { FlashcardCollectionForDB } from "../../datastructures/FlashcardCollection.js";
import FlashcardNotFoundError from "../exceptions/FlashcardNotFoundError.js";
import Flashcards from "../Flashcards.js";


export default class FlashcardCollectionsLocalDB {

  public static load(): Map<string, FlashcardCollection> {
    
    const file = readFileSync("local_database/flashcard_channels.json").toString();
    const raw = JSON.parse(file);

    const collections: [string,FlashcardCollection][] = new Array();
    raw.forEach(el => {
      
      try {
        collections.push( [el[0],
          {
            uuid: el[1].uuid,
            flashcards: el[1].flashcards.map(uuid => errorIfUndefinedFlashcard(uuid)) // get collection from UUID
          }
        ]);
      }
      catch(error) {
        console.error("Object could not be read from local file : ");
        console.error(el);
      } 

    });
    
    // @ts-ignore
    console.log(`Successfully loaded ${collections.length} out of ${raw.length} collections from local storages.`)
    return new Map<string, FlashcardCollection>( collections );
  }


  public static save(channelConfigs: Map<string,FlashcardCollection>): void {
    const mapArray: [string,FlashcardCollection][] = Array.from(channelConfigs);
    const mapArrayWithoutFlashcard: [string,FlashcardCollectionForDB][] = mapArray.map(couple => { return [ couple[0], {
        uuid: couple[1].uuid,
        flashcards: couple[1].flashcards.map(fc => fc.uuid)
      }]
    });
    writeFileSync("local_database/flashcard_channels.json", JSON.stringify(mapArrayWithoutFlashcard) );
  }


}


async function errorIfUndefinedFlashcard(uuid: string): Promise<Flashcard> {
  
  const flashcard = await Flashcards.getFlashcard(uuid);
  if(!flashcard)
    throw new FlashcardNotFoundError(uuid);

  return flashcard;
}
