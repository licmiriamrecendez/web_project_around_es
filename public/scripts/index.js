import { defaultFormConfig, initialCards } from "./utils/Constants.js";
import { FormValidator } from "./utils/FormValidator.js";
import Section from "./utils/Section.js";
import Card from "./utils/Card.js";
import PopupWithForm from "./utils/PopupWithForm.js";
import PopupWithImage from "./utils/PopupWithImage.js";
import UserInfo from "./utils/UserInfo.js";
// Botón editar perfil
const editButton = document.querySelector(".profile__edit-button");
const profileNameInput = document.querySelector("#name-input");
const profileDescriptionInput = document.querySelector("#description-input");
// Información del usuario
const userInfo = new UserInfo({
    nameSelector: ".profile__title",
    aboutSelector: ".profile__description",
});
// Popup imagen
const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();
// Popup edición perfil
const editProfilePopup = new PopupWithForm("#edit-popup", (data) => {
    userInfo.setUserInfo({
        name: data.name,
        about: data.description,
    });
});
editProfilePopup.setEventListeners();
// Sección de tarjetas
const cardSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, "#card-template", (name, link) => {
            imagePopup.openImage(name, link);
        });
        cardSection.addItem(card.generateCard());
    },
}, ".cards__list");
cardSection.renderItems();
const profileForm = document.querySelector("#edit-profile-form");
//Agregar nuevas tarjetas
const addButton = document.querySelector(".profile__add-button");
const newCardPopup = new PopupWithForm("#new-card-popup", (data) => {
    console.log("SE ENVIÓ EL FORMULARIO");
    console.log(data);
    const card = new Card({
        name: data["place-name"],
        link: data.link,
    }, "#card-template", (name, link) => {
        imagePopup.openImage(name, link);
    });
    cardSection.addItem(card.generateCard());
});
newCardPopup.setEventListeners();
//Abrir popup nueva tarjeta
addButton.addEventListener("click", () => {
    newCardPopup.open();
});
// Validación formulario
const profileValidator = new FormValidator(defaultFormConfig, profileForm);
profileValidator.enableValidation();
//Validar formulario nueva tarjeta
const newCardForm = document.querySelector("#new-card-form");
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);
newCardValidator.enableValidation();
// Abrir popup edición perfil
editButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    profileNameInput.value = userData.name;
    profileDescriptionInput.value = userData.about;
    editProfilePopup.open();
});
//# sourceMappingURL=index.js.map