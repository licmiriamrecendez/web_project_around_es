import { enableValidation, resetValidation } from "./validate.js";
// ==========================
// DATOS INICIALES
// ==========================
const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// ==========================
// ELEMENTOS
// ==========================

// Perfil
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const closeButton = editPopup.querySelector(".popup__close");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description",
);
const profileForm = document.querySelector("#edit-profile-form");

// Tarjetas
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

// Agregar tarjeta
const addButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardCloseButton = newCardPopup.querySelector(".popup__close");
const newCardForm = document.querySelector("#new-card-form");
const cardNameInput = newCardPopup.querySelector(
  ".popup__input_type_card-name",
);
const cardLinkInput = newCardPopup.querySelector(".popup__input_type_url");

// Popup imagen
const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");

// ==========================
// FUNCIONES
// ==========================

// Crear tarjeta
function getCardElement({
  name = "Sin titulo",
  link = "./images/placeholder.jpg",
}) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  // Like
  likeButton.addEventListener("click", handleLikeClick);

  // Eliminar
  deleteButton.addEventListener("click", handleDeleteCard);

  // Abrir imagen
  cardImage.addEventListener("click", () => {
    handleImageClick(name, link);
  });

  return cardElement;
}

// Renderizar tarjeta
function renderCard(name, link, container) {
  const cardElement = getCardElement({ name, link });
  container.prepend(cardElement);
}

// Modales
function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function closePopupByOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.target);
  }
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    closeModal(openedPopup);
  }
}

// Perfil
function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  resetValidation(profileForm);
  openModal(editPopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
}

// Nueva tarjeta
function handleOpenAddCardModal() {
  resetValidation(newCardForm);
  openModal(newCardPopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  renderCard(cardNameInput.value, cardLinkInput.value, cardsList);

  newCardForm.reset();
  closeModal(newCardPopup);
}

// Like
function handleLikeClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Eliminar
function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}

// Imagen popup
function handleImageClick(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
}

// ==========================
// INICIALIZACIÓN
// ==========================

initialCards.forEach((item) => {
  renderCard(item.name, item.link, cardsList);
});

enableValidation(profileForm);
enableValidation(newCardForm);

// ==========================
// EVENTOS
// ==========================

// Perfil
editButton.addEventListener("click", handleOpenEditModal);
closeButton.addEventListener("click", () => closeModal(editPopup));
profileForm.addEventListener("submit", handleProfileFormSubmit);
editPopup.addEventListener("click", closePopupByOverlay);

// Nueva tarjeta
addButton.addEventListener("click", handleOpenAddCardModal);
newCardCloseButton.addEventListener("click", () => closeModal(newCardPopup));
newCardForm.addEventListener("submit", handleCardFormSubmit);
newCardPopup.addEventListener("click", closePopupByOverlay);

// Imagen popup
imagePopupCloseButton.addEventListener("click", () => closeModal(imagePopup));
imagePopup.addEventListener("click", closePopupByOverlay);
