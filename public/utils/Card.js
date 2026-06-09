export default class Card {
    _data;
    _templateSelector;
    _handleCardClick;
    constructor(data, templateSelector, handleCardClick) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }
    // ==========================
    // Recuperar el template y retornar el elemento de la tarjeta
    // ========================== 
    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content.querySelector(".card")
            .cloneNode(true);
        return cardElement;
    }
    // ==========================
    // Agregar el evento de click a la imagen
    // ========================== 
    _setEventListeners() {
        const likeButton = this._cardElement.querySelector(".card__like-button");
        likeButton?.addEventListener("click", () => {
            console.log("LIKE FUNCIONA");
            likeButton.classList.toggle("card__like-button_is-active");
            console.log(likeButton.className);
        });
        this._cardElement
            .querySelector(".card__image")
            ?.addEventListener("click", () => {
            this._handleCardClick(this._data.name, this._data.link);
        });
    }
    // ==========================
    // Devolver un HTMLElement listo para insertarse en el DOM
    // ========================== 
    _cardElement;
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