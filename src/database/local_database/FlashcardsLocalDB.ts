import { readFileSync, writeFileSync } from "fs"

import Flashcard, { FlashcardForDB } from "../../datastructures/Flashcard.js";


export default class FlashcardsLocalDB {

  public static load(): Map<string, Flashcard> {
    
    const file = readFileSync("local_database/flashcards.json").toString();
    const raw = JSON.parse(file);

    const flashcards: [string,Flashcard][] = [];
    raw.forEach(el => {
      
      try {
        flashcards.push( [el[0],
          {
            uuid: el[1].uuid,
            front: el[1].front,
            back: el[1].back
          }
        ]);
      }
      catch(error) {
        console.error("Object could not be read from local file : ");
        console.error(el);
      } 

    });
    
    // @ts-ignore
    console.log(`Successfully loaded ${channels.length} out of ${raw.length} flashcards from local storages.`)
    return new Map<string, Flashcard>( flashcards );
  }


  public static save(channelConfigs: Map<string,Flashcard>): void {
    const mapArray: [string,Flashcard][] = Array.from(channelConfigs);
    const mapArrayWithoutFlashcard: [string,FlashcardForDB][] = mapArray.map(couple => { return [ couple[0], {
        uuid: couple[1].uuid,
        front: couple[1].front,
        back: couple[1].back
      }]
    });
    writeFileSync("local_database/flashcards.json", JSON.stringify(mapArrayWithoutFlashcard) );
  }


}