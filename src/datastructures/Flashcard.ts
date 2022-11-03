/**
 * Represents a flashcard, with text on the front and back
 */
type Flashcard = {
  uuid:string,
  front:string,
  back:Array<string> // Multiple possible answers
}

export default Flashcard;