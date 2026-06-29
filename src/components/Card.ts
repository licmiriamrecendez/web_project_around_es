// ==========================
// CREAR LAS TARJETAS
// ==========================

export interface CardFormData {
  name: string;
  link: string;
}

export interface CardData {
  _id: string;
  name: string;
  link: string;
  owner: string;
  isLiked: boolean;
  createdAt: string;
}

export default class Card {
  private _data: CardData;
  private _templateSelector: string;
  private _handleCardClick: (name: string, link: string) => void;
  private _handleDeleteClick: () => void;
  private _handleLikeClick: () => void;
  private _cardElement!: HTMLElement;
  private _isLiked: boolean;
  private _userId: string;
  private _likeButton!: HTMLButtonElement;

  constructor(
    data: CardData,
    userId: string,
    templateSelector: string,
    handleCardClick: (name: string, link: string) => void,
    handleDeleteClick: () => void,
    handleLikeClick: () => void
  ) {
    this._data = data;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._isLiked = data.isLiked;
  }

  private _getTemplate(): HTMLElement {
    const cardElement = document
      .querySelector<HTMLTemplateElement>(this._templateSelector)!
      .content.querySelector(".card")!
      .cloneNode(true) as HTMLElement;

    return cardElement;
  }

  private _setEventListeners(): void {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    const deleteButton =
      this._cardElement.querySelector<HTMLButtonElement>(
        ".card__delete-button"
      );

    deleteButton?.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._cardElement
      .querySelector(".card__image")
      ?.addEventListener("click", () => {
        this._handleCardClick(this._data.name, this._data.link);
      });
  }

  private _renderLike(): void {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }

  public isLiked(): boolean {
    return this._isLiked;
  }

  public setLikeState(cardData: CardData): void {
    this._isLiked = cardData.isLiked;
    this._renderLike();
  }

  public deleteCard(): void {
    this._cardElement.remove();
  }

  public generateCard(): HTMLElement {
    this._cardElement = this._getTemplate();

    const cardImage = this._cardElement.querySelector(
      ".card__image"
    ) as HTMLImageElement;

    const cardTitle = this._cardElement.querySelector(
      ".card__title"
    ) as HTMLElement;

    this._likeButton =
      this._cardElement.querySelector<HTMLButtonElement>(
        ".card__like-button"
      )!;

    const deleteButton =
      this._cardElement.querySelector<HTMLButtonElement>(
        ".card__delete-button"
      );

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