export default class Popup {
  constructor(selector) {
    this._modal = document.querySelector(selector);
  }

  open() {
    this._modal.classList.add("modal_opened");
    // this._setEventListeners();
  }

  close() {
    this._modal.classList.remove("modal_opened");
    this.removeEventListeners();
  }

  _handleEscClose = (event) => {
    if (event.key == "Escape") this.close();
  };

  _handleMouseClose = (event) => {
    if (
      event.target.classList.contains("modal__button_type_close") ||
      event.target == this._modal
    )
      this.close();
  };

  setEventListeners() {
    this._modal.addEventListener("mousedown", this._handleMouseClose);
    this._modal.addEventListener("keydown", this._handleEscClose);
  }

  removeEventListeners() {
    this._modal.removeEventListener("mousedown", () => this._handleMouseClose);
    this._modal.removeEventListener("keydown", () => this._handleEscClose);
  }
}
