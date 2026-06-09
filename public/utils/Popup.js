export default class Popup {
    popupElement;
    constructor(selector) {
        this.popupElement = document.querySelector(selector);
    }
    open() {
        this.popupElement.classList.add("popup_is-opened");
        document.addEventListener("keydown", this.handleEscClose);
    }
    close() {
        this.popupElement.classList.remove("popup_is-opened");
        document.removeEventListener("keydown", this.handleEscClose);
    }
    handleEscClose = (evt) => {
        if (evt.key === "Escape") {
            this.close();
        }
    };
    setEventListeners() {
        const closeButton = this.popupElement.querySelector(".popup__close");
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
//# sourceMappingURL=Popup.js.map