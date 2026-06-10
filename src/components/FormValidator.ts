export interface FormValidationConfig {
    inputSelector: string;
    submitButtonSelector: string;
    inactiveButtonClass: string;
    inputErrorClass: string;
    errorClass: string;
}

export class FormValidator {
    private _config: FormValidationConfig;
    private _formElement: HTMLFormElement;
    private _inputList: HTMLInputElement[];
    private _buttonElement: HTMLButtonElement;

    constructor(
        config: FormValidationConfig,
         formElement: HTMLFormElement
        ) {
            this._config = config; 
            this._formElement = formElement;
            this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
            this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector) as HTMLButtonElement;
        }
// ==========================
// MOSTRAR EL ERROR
// ==========================
    private _showInputError(
        inputElement: HTMLInputElement,
         errorMessage: string
        ): void {
            const errorElement = this._formElement.querySelector(`.#${inputElement.id}-error`) as HTMLElement;

            inputElement.classList.add(this._config.inputErrorClass);
            errorElement.textContent = errorMessage;
        }
// ==========================
// OCULTAR EL ERROR
// ==========================  
    private _hideInputError(
        inputElement: HTMLInputElement
    ): void {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`) as HTMLElement;   


        inputElement.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
    }
// ==========================
// VALIDAR EL INPUT
// ==========================       
private _checkInputValidity(inputElement: HTMLInputElement): void {
    if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage); 
    } else {
        this._hideInputError(inputElement);
    }
} 
private _hasInvalidInput(): boolean {
    return this._inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}      
// ==========================
// ACTIVAR O DESACTIVAR EL BOTÓN
// ==========================       
private _toggleButtonState(): void {   
    if (this._hasInvalidInput()) {
        this._buttonElement.classList.add(this._config.inactiveButtonClass);
        this._buttonElement.disabled = true;
    } else {
        this._buttonElement.classList.remove(this._config.inactiveButtonClass);
        this._buttonElement.disabled = false;
    }
    }
// ==========================
//ESCUCHAR DE EVENTOS
// ========================== 
private _setEventListeners(): void {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', (evt: Event) => {
            const target = evt.target as HTMLInputElement;
            this._checkInputValidity(target);
            this._toggleButtonState();
        }
    );
  });
}

// ==========================
//ACTIVAR VALIDACIÓN
// ========================== 
public enableValidation(): void {
    this._setEventListeners();
}
// ==========================
// RESETEAR LOS ERRORES
// ==========================
public resetValidation(): void {
    this._inputList.forEach((inputElement) => { 
        this._hideInputError(inputElement);
    });
    this._toggleButtonState();
}   
}