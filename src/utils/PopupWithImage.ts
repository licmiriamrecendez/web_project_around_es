import Popup from "./Popup.js";

export default  class PopupWithImage extends Popup {
  private imageElement: HTMLImageElement;
  private captionElement: HTMLElement;

  constructor(selector: string) {
    super(selector);

    this.imageElement =
      this.popupElement.querySelector<HTMLImageElement>(".popup__image")!;

    this.captionElement =
      this.popupElement.querySelector<HTMLElement>(".popup__caption")!;
  }

  public openImage(name: string, link: string): void {
    this.imageElement.src = link;
    this.imageElement.alt = name;
    this.captionElement.textContent = name;

    super.open();
  }
}