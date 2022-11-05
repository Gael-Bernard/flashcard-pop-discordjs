export default class FlashcardNotFoundError extends Error {

  readonly flashcardId: string;

  public constructor(flashcardId: string) {
    super();
    this.flashcardId = flashcardId;
  }


}