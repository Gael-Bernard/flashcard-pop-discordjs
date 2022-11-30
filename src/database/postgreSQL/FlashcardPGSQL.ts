import Flashcard from "../abstract/Flashcard.js"
import FlashcardUser from "../abstract/FlashcardUser.js";

export default class FlashcardPGSQL implements Flashcard {

  private flashcard_id: number;
  private question: string;
  private answers: string[];
  private creation_date: Date;

  private collection_id: number;

  
  getId(): number {
    return this.flashcard_id;
  }


  getQuestion(): string {
    return this.question;
  }
  getAnswers(): string[] {
    return [...this.answers];
  }
  getCreationDate(): Date {
    return new Date(this.creation_date.getTime());
  }
  getCollectionId(): number {
    return this.collection_id;
  }

  getCollection(): Promise<FlashcardUser> {
    throw new Error("Method not implemented.");
  }
  
}