export default class FlashcardCollectionNotFoundError extends Error {

  readonly collectionId: string;

  public constructor(collectionId: string) {
    super();
    this.collectionId = collectionId;
  }


}