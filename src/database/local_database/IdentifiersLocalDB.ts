import { readFileSync, writeFileSync } from "fs";

import FieldNotFoundError from "../exceptions/IdNotFountError.js";


export class IdentifiersLocalDB {

  private static nextFlashcardId: string = "";

  
  /**
   * Initialises this class. Necessary before using
   */
  public static async init(): Promise<void> {
    const json: string = readFileSync("local_database/ids.json", "utf-8").toString();
    const obj = JSON.parse(json);

    if(!obj.nextFlashcardId)
      throw new FieldNotFoundError("nextFlashCardId");


    this.nextFlashcardId = obj.nextFlashCardId;
  }
  

  /**
   * Saves the next IDs in a file
   */
  private static async save(): Promise<void> {
    const obj = {
      nextFlashcardId: this.nextFlashcardId
    }
    
    writeFileSync("local_database/ids.json", JSON.stringify(obj));
  }


  /**
   * Map of all the characters and the next character
   */
  private static nextChar: Map<string,string|undefined> = new Map<string,string|undefined>([
    ["0","1"], ["1","2"], ["2","3"], ["3","4"], ["4","5"], ["5","6"], ["6","7"], ["7","8"], ["8","9"], ["9","a"],
    ["a","b"], ["b","c"], ["c","d"], ["d","e"], ["e","f"], ["f","g"], ["g","h"], ["h","i"],
    ["i","j"], ["j","k"], ["k","l"], ["l","m"], ["m","n"], ["n","o"], ["o","p"], ["p","q"],
    ["q","r"], ["r","s"], ["s","t"], ["t","u"], ["u","v"], ["v","w"], ["w","x"], ["x","y"],
    ["y","z"], ["z","A"], ["A","B"], ["B","C"], ["C","D"], ["D","E"], ["E","F"], ["F","G"],
    ["G","H"], ["H","I"], ["I","J"], ["J","K"], ["K","L"], ["L","M"], ["M","N"], ["N","O"],
    ["O","P"], ["P","Q"], ["Q","R"], ["R","S"], ["S","T"], ["T","U"], ["U","V"], ["V","W"],
    ["W","X"], ["X","Y"], ["Y","Z"], ["Z",undefined]
  ]);
  

  /**
   * Computes the string ID following the one provided
   * Ex : "0" -> "1"; "1" -> "2"; "9" -> "a"; "z" -> "A"; "A" -> "B"; "10" -> "11"; "3z" -> "3A"; "hUi23K" -> "hUi23L"; "ZZZ" -> "1000"
   * @param id current ID
   * @returns next ID
   */
  public static computeIdAfter(id:string): string {
    
    for(let i = id.length-1; i >= 0; i--) {

      const c:string = id[i];
      const cNext = this.nextChar.get(c);
      
      if(cNext)
        return id.slice(0, i)+cNext+"0".repeat(id.length - i - 1);
    }

    // If the value cannot be increased while keeping the same number of digits,
    // a new digit is added. Ex : computeIdAfter("ZZZ") = "1000"
    return "1" + "0".repeat(id.length);
  }


  /**
   * Returns a unique flashcard ID, that will never be given again
   * @returns unique flashcard ID
   */
  public static generateFlashcardId(): string {
    const id = this.nextFlashcardId;
    this.nextFlashcardId = this.computeIdAfter(id);
    this.save();

    return id;
  }

}


