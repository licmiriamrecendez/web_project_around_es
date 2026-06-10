import Popup from "./Popup.js";

type SubmitCallback = (data: Record<string, string>) => void;

export default class PopupWithForm extends Popup {
  private formElement: HTMLFormElement;
  private handleFormSubmit: SubmitCallback;

  constructor(selector: string, handleFormSubmit: SubmitCallback) {
    super(selector);

    this.formElement =
      this.popupElement.querySelector<HTMLFormElement>("form")!;

    this.handleFormSubmit = handleFormSubmit;
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
}