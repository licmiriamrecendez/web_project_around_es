import { defaultFormConfig } from "./utils/Constants.js";
import { FormValidator } from "./components/FormValidator.js";
import Section from "./components/Section.js";
import Card, { type CardData } from "./components/Card.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";
import { Api } from "./components/Api.js";
import PopupWithConfirmation from "./components/PopupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "613810f9-9a98-4a21-a274-d401ee96f2d0",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
});

const profileImage = document.querySelector<HTMLImageElement>(".profile__image")!;
const editButton = document.querySelector<HTMLButtonElement>(".profile__edit-button")!;
const addButton = document.querySelector<HTMLButtonElement>(".profile__add-button")!;
const avatarButton = document.querySelector<HTMLButtonElement>(".profile__avatar-edit-button")!;

const profileForm = document.querySelector<HTMLFormElement>("#edit-profile-form")!;
const newCardForm = document.querySelector<HTMLFormElement>("#new-card-form")!;
const avatarForm = document.querySelector<HTMLFormElement>("#avatar-form")!;

const profileNameInput = document.querySelector<HTMLInputElement>("#name-input")!;
const profileDescriptionInput = document.querySelector<HTMLInputElement>("#description-input")!;

let cardSection: Section<CardData>;
let cardToDelete: Card | null = null;
let cardIdToDelete: string | null = null;

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const profileValidator = new FormValidator(defaultFormConfig, profileForm);
const newCardValidator = new FormValidator(defaultFormConfig, newCardForm);
const avatarValidator = new FormValidator(defaultFormConfig, avatarForm);

profileValidator.enableValidation();
newCardValidator.enableValidation();
avatarValidator.enableValidation();

function createCard(cardData: CardData): HTMLElement {
  const card = new Card(
    cardData,
    userInfo.getUserId(),
    "#card-template",

    (name, link) => {
      imagePopup.openImage(name, link);
    },

    () => {
      cardToDelete = card;
      cardIdToDelete = cardData._id;
      deleteCardPopup.open();
    },

     async () => {
      try {
        const updatedCard = card.isLiked()
          ? await api.removeLike(cardData._id)
          : await api.addLike(cardData._id);

        card.setLikeState(updatedCard);
      } catch (err) {
        console.error("Error al cambiar like:", err);
      }
    }
  );

  return card.generateCard();
}

const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup", async () => {
  if (!cardToDelete || !cardIdToDelete) return;

  try {
    await api.deleteCard(cardIdToDelete);

    cardToDelete.deleteCard();
    deleteCardPopup.close();

    cardToDelete = null;
    cardIdToDelete = null;
  } catch (err) {
    console.error("Error al eliminar tarjeta:", err);
  }
});

deleteCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm("#edit-popup", async (data) => {
  editProfilePopup.renderLoading(true);

  try {
    const user = await api.editUserInfo({
      name: data.name!,
      about: data.description!,
    });

    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
    });

    editProfilePopup.close();
  } catch (err) {
    console.error("Error al editar perfil:", err);
  } finally {
    editProfilePopup.renderLoading(false);
  }
});

editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm("#new-card-popup", async (data) => {
  newCardPopup.renderLoading(true);

  try {
    const cardData = await api.addCard({
      name: data["place-name"]!,
      link: data.link!,
    });

    cardSection.addItem(createCard(cardData));

    newCardPopup.close();
    newCardForm.reset();
    newCardValidator.disableButton();
  } catch (err) {
    console.error("Error al agregar tarjeta:", err);
  } finally {
    newCardPopup.renderLoading(false);
  }
});

newCardPopup.setEventListeners();

const avatarPopup = new PopupWithForm("#avatar-popup", async (data) => {
  avatarPopup.renderLoading(true);

  try {
    const user = await api.updateAvatar({
      avatar: data.avatar!,
    });

    profileImage.src = user.avatar;

    avatarPopup.close();
    avatarForm.reset();
    avatarValidator.disableButton();
  } catch (err) {
    console.error("Error al actualizar avatar:", err);
  } finally {
    avatarPopup.renderLoading(false);
  }
});

avatarPopup.setEventListeners();

async function loadInitialData(): Promise<void> {
  try {
    const [user, cards] = await Promise.all([
      api.getUserInfo(),
      api.getInitialCards(),
    ]);

    userInfo.setUserInfo({
      name: user.name,
      about: user.about,
    });

    userInfo.setUserId(user._id);
    profileImage.src = user.avatar;

    cardSection = new Section<CardData>(
      {
        items: cards,
        renderer: (item) => {
          cardSection.addItem(createCard(item));
        },
      },
      ".cards__list"
    );

    cardSection.renderItems();
  } catch (err) {
    console.error("Fallo al cargar datos iniciales:", err);
  }
}

loadInitialData();
editButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  profileNameInput.value = userData.name;
  profileDescriptionInput.value = userData.about;

  profileValidator.resetValidation();
  editProfilePopup.open();
});

addButton.addEventListener("click", () => {
  newCardForm.reset();
  newCardValidator.resetValidation();
  newCardPopup.open();
});

avatarButton.addEventListener("click", () => {
  avatarForm.reset();
  avatarValidator.resetValidation();
  avatarPopup.open();
});
