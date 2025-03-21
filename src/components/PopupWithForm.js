import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, callback }) {
    super(selector);
    this._submitHandler = callback;
    this._form = this._modal.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__input");
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
      this._submitHandler(this._getInputValues());
      super.close();
      this._form.reset();
    });
  }

  setInputsValues(inputData) {
    this._inputList.forEach((item) => (item.value = inputData[item.name]));
  }

  getForm() {
    return this._form;
  }
}
