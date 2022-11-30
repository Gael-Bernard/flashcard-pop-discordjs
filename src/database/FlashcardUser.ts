import FlashcardCollection from "./FlashcardCollection.js";
import UserAnswers from "./UserAnswers.js";

export default interface FlashcardUser {

  getId(): number;

  getFlashcardCollectionIds(): Promise<number[]>;
  getFlashcardCollections(): Promise<FlashcardCollection[]>;

  getCollectionStatistics(collectionId: number): Promise<UserAnswers>;
  getAllCollectionStatistics(): Promise<UserAnswers[]>;

}