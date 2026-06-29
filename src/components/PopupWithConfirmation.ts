import Popup from "./Popup.js";

type ConfirmCallback = () => void;

export default class PopupWithConfirmation extends Popup {
  private formElement: HTMLFormElement;
  private handleConfirm: ConfirmCallback;

  constructor(selector: string, handleConfirm: ConfirmCallback) {
    super(selector);

    this.formElement =
      this.popupElement.querySelector<HTMLFormElement>("form")!;

    this.handleConfirm = handleConfirm;
  }

  public override setEventListeners(): void {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();
      this.handleConfirm();
    });
  }
}