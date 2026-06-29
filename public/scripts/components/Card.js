// ==========================
// CREAR LAS TARJETAS
// ==========================
export default class Card {
    _data;
    _templateSelector;
    _handleCardClick;
    _handleDeleteClick;
    _handleLikeClick;
    _cardElement;
    _isLiked;
    _userId;
    _likeButton;
    constructor(data, userId, templateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._data = data;
        this._userId = userId;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
        this._isLiked = data.isLiked;
    }
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }
    _setEventListeners() {
        this._likeButton.addEventListener("click", () => {
            this._handleLikeClick();
        });
        const deleteButton = this._cardElement.querySelector(".card__delete-button");
        deleteButton?.addEventListener("click", () => {
            this._handleDeleteClick();
        });
        this._cardElement
            .querySelector(".card__image")
            ?.addEventListener("click", () => {
            this._handleCardClick(this._data.name, this._data.link);
        });
    }
    _renderLike() {
        if (this._isLiked) {
            this._likeButton.classList.add("card__like-button_is-active");
        }
        else {
            this._likeButton.classList.remove("card__like-button_is-active");
        }
    }
    isLiked() {
        return this._isLiked;
    }
    setLikeState(cardData) {
        this._isLiked = cardData.isLiked;
        this._renderLike();
    }
    deleteCard() {
        this._cardElement.remove();
    }
    generateCard() {
        this._cardElement = this._getTemplate();
        const cardImage = this._cardElement.querySelector(".card__image");
        const cardTitle = this._cardElement.querySelector(".card__title");
        this._likeButton =
            this._cardElement.querySelector(".card__like-button");
        const deleteButton = this._cardElement.querySelector(".card__delete-button");
        cardTitle.textContent = this._data.name;
        cardImage.src = this._data.link;
        cardImage.alt = this._data.name;
        if (this._data.owner !== this._userId) {
            deleteButton?.remove();
        }
        this._renderLike();
        this._setEventListeners();
        return this._cardElement;
    }
}
//# sourceMappingURL=Card.js.map