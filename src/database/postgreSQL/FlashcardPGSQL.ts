import Flashcard from "../abstract/Flashcard.js"
import FlashcardCollection from "../abstract/FlashcardCollection.js";
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

  setQuestion(newQuestion: string): Promise<void> {
    throw new Error("Method not implemented."); // TODO
  }


  getAnswerAt(index: number): string|undefined {
    return this.answers.at(index);
  }

  getAnswers(): string[] {
    return [...this.answers];
  }
  
  addAnswer(newAnswer: string): Promise<void> {
    throw new Error("Method not implemented."); // TODO
  }

  setAnswers(newAnswers: string[]): Promise<void> {
    throw new Error("Method not implemented."); // TODO
  }


  getCreationDate(): Date {
    return new Date(this.creation_date.getTime());
  }
  getCollectionId(): Promise<number> {
    return new Promise<number>(() => this.collection_id);
  }

  getCollection(): Promise<FlashcardCollection> {
    throw new Error("Method not implemented.");
  }
  
}