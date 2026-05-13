// ==========================
// VALIDACION
// ==========================

function showInputError(inputElement, errorMessage) {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
}

function hideInputError(inputElement) {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
}

function checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage);
  } else {
    hideInputError(inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_disabled");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_disabled");
  }
}

export function resetValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));

  const buttonElement = formElement.querySelector(".popup__button");

  inputList.forEach((inputElement) => {
    const errorElement = document.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove("popup__input_type_error");

    errorElement.textContent = "";
  });

  buttonElement.disabled = true;
  buttonElement.classList.add("popup__button_disabled");
}

function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));

  const buttonElement = formElement.querySelector(".popup__button");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
}

export function enableValidation(formElement) {
  setEventListeners(formElement);
}
