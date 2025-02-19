export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _handleLikeButton(event) {
    event.target.classList.toggle("card__button-like_state_active");
  }

  _handleDeleteButton(event) {
    event.target.closest(".card").remove();
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__button-like")
      .addEventListener("click", this._handleLikeButton);

    this._cardElement
      .querySelector(".card__button-delete")
      .addEventListener("click", this._handleDeleteButton);

    this.image.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  generateCard() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardElement.querySelector(".card__name").textContent = this._name;
    this.image = this._cardElement.querySelector(".card__image");
    this.image.src = this._link;
    this.image.alt = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
