import Flashcard from "../Flashcard.js";
import FlashcardUser from "../FlashcardUser";
import UserAnswers from "../UserAnswers.js";

export default interface FlashcardCollection {

  getId(): number;
  getSize(): number;

  getFlashcardAt(index: number): Promise<Flashcard>;
  getAllFlashcards(): Promise<Flashcard[]>;

  getOwnerId(): number;
  getOwner(): Promise<FlashcardUser>;

  getUserStatistics(uuid: number): Promise<UserAnswers>;
  getAllUserStatistics(uuid: number): Promise<UserAnswers[]>;

}