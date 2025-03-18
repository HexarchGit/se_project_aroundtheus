import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._modal.querySelector(".modal__image");
    this._imageName = this._modal.querySelector(".modal__image-name");
  }

  open({ name, link }) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._imageName.textContent = name;
  }
}
