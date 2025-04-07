import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, callback }) {
    super(selector);
    this._submitHandler = callback;
    this._form = this._modal.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._submitButton = this._form.querySelector(".modal__button_type_submit");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (item) => (this._formValues[item.name] = item.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      const buttonText = this._submitButton.textContent;
      this._submitButton.textContent = "Saving...";
      this._submitHandler(this._getInputValues())
        .then(() => {
          super.close();
          this._form.reset();
        })
        .catch((error) => console.error(error))
        .finally(() => (this._submitButton.textContent = buttonText));
    });
  }

  setInputsValues(inputData) {
    this._inputList.forEach((item) => (item.value = inputData[item.name]));
  }

  getForm() {
    return this._form;
  }
}
