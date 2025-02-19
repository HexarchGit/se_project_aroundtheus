export default class FormValidator {
  constructor(form, settings) {
    this._settings = settings;
    this._form = form;
  }

  _showError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    errorElement.classList.add(this._settings.errorClass);
    input.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = input.validationMessage;
  }

  _hideError(input) {
    const errorElement = this._form.querySelector(`.${input.id}-error`);
    errorElement.classList.remove(this._settings.errorClass);
    input.classList.remove(this._settings.inputErrorClass);
    errorElement.textContent = "";
  }

  _disableButton() {
    this._submitButton.classList.add(this._settings.inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._settings.inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _hasInvalidInput() {
    return this._inputsList.some((input) => !input.validity.valid);
  }

  _toggleButton() {
    this._hasInvalidInput() ? this._disableButton() : this._enableButton();
  }

  _checkInputValidity(event) {
    this._toggleButton();
    const input = event.target;
    if (!input.validity.valid) this._showError(input);
    else this._hideError(input);
  }

  _setInputsListener() {
    this._inputsList.forEach((input) => {
      input.addEventListener("input", (event) =>
        this._checkInputValidity(event)
      );
    });

    this._form.addEventListener("reset", () => {
      this._inputsList.forEach((input) => this._hideError(input));
      this._disableButton();
    });
  }

  validateButton() {
    this._toggleButton();
  }

  enableValidation() {
    this._inputsList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );
    this._submitButton = this._form.querySelector(
      this._settings.submitButtonSelector
    );
    this._setInputsListener();
  }
}
