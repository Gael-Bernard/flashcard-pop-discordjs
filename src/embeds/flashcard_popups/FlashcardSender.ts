import { EmbedBuilder } from "@discordjs/builders";

export default abstract class FlashcardSender {
  
  protected abstract createFlashcardPopup(): EmbedBuilder;
  public abstract send(): void;

}