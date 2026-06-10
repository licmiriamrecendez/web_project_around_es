export default class Popup {
  protected popupElement: HTMLElement;

  constructor(selector: string) {
    this.popupElement = document.querySelector(selector)!;
  }

  public open(): void {
    this.popupElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", this.handleEscClose);
  }

  public close(): void {
    this.popupElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this.handleEscClose);
  }

  private handleEscClose = (evt: KeyboardEvent): void => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  public setEventListeners(): void {
    const closeButton =
      this.popupElement.querySelector<HTMLButtonElement>(".popup__close");

    closeButton?.addEventListener("click", () => {
      this.close();
    });

    this.popupElement.addEventListener("click", (evt) => {
      if (evt.target === this.popupElement) {
        this.close();
      }
    });
  }
}
