import Popup from "./Popup.js";

export default class PopupWithConfimration extends Popup {
  constructor(selector) {
    super(selector);
    this._confirmButton = document.getElementById("button-confirm");
  }

  open() {
    super.open();

    return new Promise((resolve) => {
      this._isConfirmed = false;
      this._resolve = resolve;
      this._buttonText = this._confirmButton.textContent;
      this._handleConfirm = () => {
        this._isConfirmed = true;
        this._confirmButton.textContent = "Saving...";
        this._resolve(true);
      };
      this._confirmButton.addEventListener("click", this._handleConfirm, {
        once: true,
      });
    });
  }

  close() {
    if (!this._isConfirmed) {
      this._resolve(false);
      this._resolve = null;
    }
    if (this._confirmButton.textContent !== this._buttonText)
      this._confirmButton.textContent = this._buttonText;
    super.close();
  }
}
