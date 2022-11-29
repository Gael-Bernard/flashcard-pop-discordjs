import FlashcardUser from "./FlashcardUser";

export default interface UserAnswers {

  getNbAnswers(): number;
  getNbCorrectAnswers(): number;
  getNbWrongAnswers(): number;
  getRatioCorrectAnswers(): number;
  
  getUserId(): number;
  getUser(): Promise<FlashcardUser>;

  getCollectionId(): number;
  getCollection(): Promise<FlashcardUser>;

}