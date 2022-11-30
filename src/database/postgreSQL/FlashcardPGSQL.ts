import Flashcard from "../abstract/Flashcard.js"
import FlashcardCollection from "../abstract/FlashcardCollection.js";


export default class FlashcardPGSQL implements Flashcard {

  private flashcard_id: number;
  private question: string;
  private answers: string[];
  private creation_date: Date;

  private collection_id: number;


  public getId(): number {
    return this.flashcard_id;
  }


  public getQuestion(): string {
    return this.question;
  }

  public setQuestion(newQuestion: string): Promise<void> {
    throw new Error("Method not implemented."); // TODO
  }


  public getAnswerAt(index: number): string|undefined {
    return this.answers.at(index);
  }

  public getAnswers(): string[] {
    return [...this.answers];
  }
  
  public addAnswer(newAnswer: string): Promise<void> {
    throw new Error("Method not implemented."); // TODO
  }

  public setAnswers(newAnswers: string[]): Promise<void> {
    throw new Error("Method not implemented."); // TODO
  }


  public getCreationDate(): Date {
    return new Date(this.creation_date.getTime());
  }
  public getCollectionId(): Promise<number> {
    return new Promise<number>(() => this.collection_id);
  }

  public getCollection(): Promise<FlashcardCollection> {
    throw new Error("Method not implemented.");
  }
  
}