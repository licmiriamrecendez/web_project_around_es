import Popup from "./Popup.js";
export default class PopupWithConfirmation extends Popup {
    formElement;
    handleConfirm;
    constructor(selector, handleConfirm) {
        super(selector);
        this.formElement =
            this.popupElement.querySelector("form");
        this.handleConfirm = handleConfirm;
    }
    setEventListeners() {
        super.setEventListeners();
        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            this.handleConfirm();
        });
    }
}
//# sourceMappingURL=PopupWithConfirmation.js.map