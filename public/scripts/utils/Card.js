export default class Card {
    _data;
    _templateSelector;
    _handleCardClick;
    _cardElement;
    constructor(data, templateSelector, handleCardClick) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }
    _setEventListeners() {
        const likeButton = this._cardElement.querySelector(".card__like-button");
        likeButton?.addEventListener("click", () => {
            likeButton.classList.toggle("card__like-button_is-active");
        });
        this._cardElement
            .querySelector(".card__image")
            ?.addEventListener("click", () => {
            this._handleCardClick(this._data.name, this._data.link);
        });
    }
    generateCard() {
        this._cardElement = this._getTemplate();
        const cardImage = this._cardElement.querySelector(".card__image");
        const cardTitle = this._cardElement.querySelector(".card__title");
        cardTitle.textContent = this._data.name;
        cardImage.src = this._data.link;
        cardImage.alt = this._data.name;
        this._setEventListeners();
        return this._cardElement;
    }
}
//# sourceMappingURL=Card.js.map