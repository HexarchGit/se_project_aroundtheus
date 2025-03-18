export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _handleLikeButton = (event) => {
    event.target.classList.toggle("card__button-like_state_active");
  };

  _handleDeleteButton = () => {
    this._cardElement.remove();
  };

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__button-like")
      .addEventListener("click", this._handleLikeButton);

    this._cardElement
      .querySelector(".card__button-delete")
      .addEventListener("click", this._handleDeleteButton);

    this._image.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  generateCard() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardElement.querySelector(".card__name").textContent = this._name;
    this._image = this._cardElement.querySelector(".card__image");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
