import Flashcard from "../datastructures/Flashcard.js";

export default function getFlashcardsOf(uuid:string) :Flashcard[] {
  return [
    { front: "Salut", back:"Hi" },
    { front: "Bonjour", back: "*Good morning* in the morning, *good afternoon* on the afternoon" }
  ];
}