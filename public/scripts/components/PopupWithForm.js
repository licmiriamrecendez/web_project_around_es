import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    formElement;
    handleFormSubmit;
    _submitButton;
    _defaultButtonText;
    constructor(selector, handleFormSubmit) {
        super(selector);
        this.formElement =
            this.popupElement.querySelector("form");
        this.handleFormSubmit = handleFormSubmit;
        this._submitButton =
            this.popupElement.querySelector(".popup__button");
        this._defaultButtonText =
            this._submitButton.textContent;
    }
    getInputValues() {
        const inputList = this.formElement.querySelectorAll(".popup__input");
        const values = {};
        inputList.forEach((input) => {
            values[input.name] = input.value;
        });
        return values;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.handleFormSubmit(this.getInputValues());
        });
    }
    close() {
        super.close();
        this.formElement.reset();
    }
    renderLoading(isLoading) {
        this._submitButton.textContent = isLoading
            ? "Guardando..."
            : this._defaultButtonText;
    }
}
//# sourceMappingURL=PopupWithForm.js.map