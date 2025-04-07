export default class Card {
  constructor(
    { name, link, _id },
    cardSelector,
    handleImageClick,
    handleApiCallback,
    handleDeleteButton
  ) {
    this._name = name;
    this._link = link;
    this._cardId = _id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleApiCallback = handleApiCallback;
    this._handleDeleteButton = handleDeleteButton;
  }

  _handleLikeButton = (event) => {
    if (event.target.classList.contains("card__button-like_state_active")) {
      this._callbackOptions = {
        action: "DELETE",
        endpoint: `cards/${this._cardId}/likes`,
      };
    }
    this._callbackOptions = {
      action: "PUT",
      endpoint: `cards/${this._cardId}/likes`,
    };
    this._handleApiCallback(this._callbackOptions)
      .then(() =>
        event.target.classList.toggle("card__button-like_state_active")
      )
      .catch((error) => console.error(error));
  };

  _handleDeletion = () => {
    this._handleDeleteButton()
      .then((confirmation) => {
        if (confirmation) {
          this._handleApiCallback({
            action: "DELETE",
            endpoint: `cards/${this._cardId}`,
          });
          this._cardElement.remove();
        }
      })
      .catch((error) => console.error(error));
  };

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__button-like")
      .addEventListener("click", this._handleLikeButton);

    this._cardElement
      .querySelector(".card__button-delete")
      .addEventListener("click", this._handleDeletion);

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
