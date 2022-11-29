import FlashcardUser from "./FlashcardUser";

export default interface Flashcard {

  getId(): number;
  getQuestion(): string;
  getAnswers(): string[];
  getCreationDate(): Date;

  getCollectionId(): number;
  getCollection(): Promise<FlashcardUser>;

}