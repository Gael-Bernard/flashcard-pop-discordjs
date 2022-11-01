export default class FieldNotFoundError extends Error {

  readonly fieldName: string;

  public constructor(fieldName: string) {
    super(`Field ${fieldName} was not found`);
    this.fieldName = fieldName;
  }

}