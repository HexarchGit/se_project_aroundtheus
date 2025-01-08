const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
const cardsList = document.querySelector(".elements__list");
const modal = document.querySelector(".modal");
const modalForm = document.forms["edit-form"];
const modalFormName = modalForm.elements["edit-name"];
const modalFormDescription = modalForm.elements["edit-description"];
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

function getCardElement(data) {
  const cardElement = document
    .querySelector("#card")
    .content.querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__name").textContent = data.name;
  return cardElement;
}

for (let card of initialCards) {
  cardsList.append(getCardElement(card));
}

document
  .querySelector(".profile__button_type_edit")
  .addEventListener("click", function () {
    modal.classList.add("modal_opened");
    modalFormName.value = profileName.textContent;
    modalFormDescription.value = profileDescription.textContent;
  });

function closeModal() {
  modal.classList.remove("modal_opened");
}

document
  .querySelector(".modal__button_type_close")
  .addEventListener("click", function () {
    closeModal();
  });

modalForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = modalFormName.value;
  profileDescription.textContent = modalFormDescription.value;
  closeModal();
});
