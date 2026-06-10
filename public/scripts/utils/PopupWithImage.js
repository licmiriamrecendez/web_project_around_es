import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
    imageElement;
    captionElement;
    constructor(selector) {
        super(selector);
        this.imageElement =
            this.popupElement.querySelector(".popup__image");
        this.captionElement =
            this.popupElement.querySelector(".popup__caption");
    }
    openImage(name, link) {
        this.imageElement.src = link;
        this.imageElement.alt = name;
        this.captionElement.textContent = name;
        super.open();
    }
}
//# sourceMappingURL=PopupWithImage.js.map