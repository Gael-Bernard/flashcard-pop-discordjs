import { readFileSync, writeFileSync } from "fs";

import Carduser, { CarduserForDB } from "../../datastructures/Carduser.js";
import FlashcardCollection from "../../datastructures/FlashcardCollection.js";
import FlashcardCollectionNotFoundError from "../exceptions/FlashcardCollectionNotFoundError.js";
import FlashcardCollections from "../FlashcardCollections.js";


export default class CardusersLocalDB {

  public static load(): Map<string, Carduser> {
    
    const file = readFileSync("local_database/cardusers.json").toString();
    const raw = JSON.parse(file);

    const cardusers: [string,Carduser][] = new Array<[string,Carduser]>();
    raw.forEach(el => {
      
      try {
        cardusers.push( [el[0],
          {
            uuid: el[1].uuid,
            flashcardCollections: el[1].flashcardCollections.map(uuid => errorIfUndefinedCollection(uuid)) // get collection from UUID
          }
        ]);
      }
      catch(error) {
        console.error("Object could not be read from local file : ");
        console.error(el);
      } 

    });
    
    console.log(`Successfully loaded ${cardusers.length} out of ${raw.length} configured channels from local storages.`)
    return new Map<string,Carduser>( cardusers );
  }


  public static save(cardusers: Map<string,Carduser>): void {
    const mapArray: [string,Carduser][] = Array.from(cardusers);
    const mapArrayWithoutFlashcard: [string,CarduserForDB][] = mapArray.map(couple => { return [ couple[0], {
        uuid: couple[1].uuid,
        flashcardCollections: couple[1].flashcardCollections.map(fc => fc.uuid)
      }]
    });
    writeFileSync("local_database/cardusers.json", JSON.stringify(mapArrayWithoutFlashcard) );
  }


}



async function errorIfUndefinedCollection(uuid: string): Promise<FlashcardCollection> {
  
  const collection = await FlashcardCollections.getCollection(uuid);
  if(!collection)
    throw new FlashcardCollectionNotFoundError(uuid);

  return collection;
}