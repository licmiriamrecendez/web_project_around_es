
// ==========================
// CREAR LAS TARJETAS
// ========================== 
export interface CardData {
  name: string;
  link: string;
}   
export default class Card {
  private _data: CardData;
  private _templateSelector: string;
  private _handleCardClick: (name: string, link: string) => void;

  constructor(
    data: CardData,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void
  ) {
    this._data = data;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  // ==========================
// Recuperar el template y retornar el elemento de la tarjeta
// ========================== 
  
  private _getTemplate(): HTMLElement {
    const cardElement = document
      .querySelector<HTMLTemplateElement>(this._templateSelector)!
      .content.querySelector(".card")!
      .cloneNode(true) as HTMLElement;

    return cardElement;
  }
    // ==========================
// Agregar el evento de click a la imagen
// ========================== 
private _setEventListeners(): void {
  const likeButton =
    this._cardElement.querySelector<HTMLButtonElement>(
      ".card__like-button"
    );

likeButton?.addEventListener("click", () => {
  console.log("LIKE FUNCIONA");

  likeButton.classList.toggle(
    "card__like-button_is-active"
  );

  console.log(likeButton.className);
});

  this._cardElement
    .querySelector(".card__image")
    ?.addEventListener("click", () => {
      this._handleCardClick(
        this._data.name,
        this._data.link
      );
    });
}
     // ==========================
// Devolver un HTMLElement listo para insertarse en el DOM
// ========================== 

private _cardElement!: HTMLElement;

  public generateCard(): HTMLElement {
    this._cardElement = this._getTemplate();

    const cardImage = this._cardElement.querySelector(
      ".card__image"
    ) as HTMLImageElement;

    const cardTitle = this._cardElement.querySelector(
      ".card__title"
    ) as HTMLElement;

    cardTitle.textContent = this._data.name;
    cardImage.src = this._data.link;
    cardImage.alt = this._data.name;

    this._setEventListeners();

    return this._cardElement;
  }
}