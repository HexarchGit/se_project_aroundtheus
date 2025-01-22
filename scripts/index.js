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
const modalEdit = document.querySelector("#modal-edit");
const modalEditForm = document.forms["edit-form"];
const modalEditFormName = modalEditForm.elements["edit-name"];
const modalEditFormDescription = modalEditForm.elements["edit-description"];
const modalAdd = document.querySelector("#modal-add");
const modalAddForm = document.forms["add-form"];
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const modalImage = document.querySelector("#modal-image");

function generateCardElement(data) {
  const cardElement = document
    .querySelector("#card")
    .content.querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__name").textContent = data.name;

  cardImage.addEventListener("click", (event) =>
    imageClickHandler(event.target)
  );
  cardElement
    .querySelector(".card__button-like")
    .addEventListener("click", (event) =>
      event.target.classList.toggle("card__button-like_state_active")
    );
  cardElement
    .querySelector(".card__button-delete")
    .addEventListener("click", (event) =>
      event.target.closest(".card").remove()
    );
  return cardElement;
}

function imageClickHandler(item) {
  const image = modalImage.querySelector(".modal__image");
  image.src = item.src;
  image.alt = item.alt;
  modalImage.querySelector(".modal__image-name").textContent = item.alt;
  openModal(modalImage);
}

const addCard = (data) => cardsList.prepend(generateCardElement(data));

initialCards.forEach((cardData) => addCard(cardData));

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

//adding listener for each button with class .modal__button_type_close
Array.from(document.querySelectorAll(".modal__button_type_close")).forEach(
  (item) =>
    item.addEventListener("click", (event) =>
      closeModal(event.target.closest(".modal"))
    )
);

document
  .querySelector(".profile__button_type_edit")
  .addEventListener("click", function () {
    openModal(modalEdit);
    modalEditFormName.value = profileName.textContent;
    modalEditFormDescription.value = profileDescription.textContent;
  });

modalEditForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = modalEditFormName.value;
  profileDescription.textContent = modalEditFormDescription.value;
  closeModal(modalEdit);
});

document
  .querySelector(".profile__button_type_add")
  .addEventListener("click", () => openModal(modalAdd));

modalAddForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const cardData = {
    name: modalAddForm.elements["add-name"].value,
    link: modalAddForm.elements["add-description"].value,
  };
  addCard(cardData);
  closeModal(modalAdd);
  modalAddForm.reset();
});
