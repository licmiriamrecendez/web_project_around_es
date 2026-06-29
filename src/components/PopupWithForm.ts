import Popup from "./Popup.js";

type SubmitCallback = (data: Record<string, string>) => void;

export default class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private handleFormSubmit: SubmitCallback;
  private _submitButton: HTMLButtonElement;
  private _defaultButtonText: string;

  constructor(selector: string, handleFormSubmit: SubmitCallback) {
    super(selector);

    this.formElement =
      this.popupElement.querySelector<HTMLFormElement>("form")!;

    this.handleFormSubmit = handleFormSubmit;
    this._submitButton =
  this.popupElement.querySelector(".popup__button")!;

this._defaultButtonText =
  this._submitButton.textContent!;
  }

  private getInputValues(): Record<string, string> {
    const inputList =
      this.formElement.querySelectorAll<HTMLInputElement>(".popup__input");

    const values: Record<string, string> = {};

    inputList.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  public override setEventListeners(): void {
    super.setEventListeners();

    this.formElement.addEventListener("submit", (evt: SubmitEvent) => {
      evt.preventDefault();
      this.handleFormSubmit(this.getInputValues());
    });
  }

  public override close(): void {
    super.close();
    this.formElement.reset();
  }

public renderLoading(isLoading: boolean): void {
  this._submitButton.textContent = isLoading
    ? "Guardando..."
    : this._defaultButtonText;
}
}
