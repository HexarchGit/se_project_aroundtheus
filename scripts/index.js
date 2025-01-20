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
initialCards.forEach((card) => cardsList.append(getCardElement(card)));

const modalEdit = document.querySelector("#modal-edit");
const modalEditForm = document.forms["edit-form"];
const modalEditFormName = modalEditForm.elements["edit-name"];
const modalEditFormDescription = modalEditForm.elements["edit-description"];
const modalAdd = document.querySelector("#modal-add");
const modalAddForm = document.forms["add-form"];
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const modalImage = document.querySelector("#modal-image");

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

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

//adding listener for each button with class .modal__button_type_close
Array.from(document.querySelectorAll(".modal__button_type_close")).forEach(
  (item) =>
    item.addEventListener("click", (event) =>
      event.target.closest(".modal").classList.remove("modal_opened")
    )
);

document
  .querySelector(".profile__button_type_edit")
  .addEventListener("click", function () {
    modalEdit.classList.add("modal_opened");
    modalEditFormName.value = profileName.textContent;
    modalEditFormDescription.value = profileDescription.textContent;
  });

modalEditForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = modalEditFormName.value;
  profileDescription.textContent = modalEditFormDescription.value;
  closeModal(modalEditForm);
});

document
  .querySelector(".profile__button_type_add")
  .addEventListener("click", () => modalAdd.classList.add("modal_opened"));

modalAddForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const card = {
    name: modalAddForm.elements["add-name"].value,
    link: modalAddForm.elements["add-description"].value,
  };
  cardsList.prepend(getCardElement(card));
  closeModal(modalAddForm);
});

Array.from(document.querySelectorAll(".card__button-like")).forEach((item) =>
  item.addEventListener("click", (event) =>
    event.target.classList.toggle("card__button-like_state_active")
  )
);

Array.from(document.querySelectorAll(".card__button-delete")).forEach((item) =>
  item.addEventListener("click", (event) =>
    event.target.closest(".card").remove()
  )
);

function imageClickHandler(item) {
  const image = modalImage.querySelector(".modal__image");
  image.src = item.src;
  image.alt = item.alt;
  modalImage.querySelector(".modal__image-name").textContent = item.alt;
  modalImage.classList.add("modal_opened");
}

Array.from(cardsList.children).forEach((item) =>
  item.addEventListener("click", (event) => imageClickHandler(event.target))
);
