import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
    formElement;
    handleFormSubmit;
    constructor(selector, handleFormSubmit) {
        super(selector);
        this.formElement =
            this.popupElement.querySelector("form");
        this.handleFormSubmit = handleFormSubmit;
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
}
//# sourceMappingURL=PopupWithForm.js.map