import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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

const validateFormConfigObject = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button_type_submit",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_active",
};

const cardsList = document.querySelector(".elements__list");
const modalImageContainer = document.querySelector("#modal-image-container");
const modalImage = modalImageContainer.querySelector(".modal__image");
const modalImageName = modalImageContainer.querySelector(".modal__image-name");
const buttonEdit = document.querySelector(".profile__button_type_edit");
const modalEdit = document.querySelector("#modal-edit");
const modalEditForm = document.forms["edit-form"];
const modalEditFormName = modalEditForm.elements["edit-name"];
const modalEditFormDescription = modalEditForm.elements["edit-description"];
const buttonAdd = document.querySelector(".profile__button_type_add");
const modalAdd = document.querySelector("#modal-add");
const modalAddForm = document.forms["add-form"];
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const addCard = (generatedCard) => cardsList.prepend(generatedCard);

const initializeCards = (initialData) => {
  initialData.forEach((cardData) => {
    const card = new Card(cardData, "#card", handleImageClick);
    addCard(card.generateCard());
  });
};

const closeModal = (modal) => {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("mousedown", handleClose);
};

const openModal = (modal) => {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", handleClose);
  document.addEventListener("keydown", handleEscape);
};

const handleEscape = (event) => {
  if (event.key == "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
};

const handleClose = (event) => {
  const modal = event.currentTarget;
  if (
    event.target.classList.contains("modal__button_type_close") ||
    event.target == modal
  ) {
    closeModal(modal);
  }
};

const handleImageClick = (card) => {
  modalImage.src = card.image.src;
  modalImage.alt = card.image.alt;
  modalImageName.textContent = card.image.alt;
  openModal(modalImageContainer);
};

const editValidator = new FormValidator(
  modalEditForm,
  validateFormConfigObject
);
editValidator.enableValidation();

const addValidator = new FormValidator(modalAddForm, validateFormConfigObject);
addValidator.enableValidation();

buttonEdit.addEventListener("click", () => {
  editValidator.validate();
  openModal(modalEdit);
});

const refreshEditInputs = () => {
  modalEditFormName.value = profileName.textContent;
  modalEditFormDescription.value = profileDescription.textContent;
};

modalEditForm.addEventListener("submit", function (event) {
  event.preventDefault();
  profileName.textContent = modalEditFormName.value;
  profileDescription.textContent = modalEditFormDescription.value;
  closeModal(modalEdit);
  modalEditForm.reset();
  refreshEditInputs();
});

buttonAdd.addEventListener("click", () => {
  addValidator.validate();
  openModal(modalAdd);
});

modalAddForm.addEventListener("submit", function (event) {
  event.preventDefault();
  closeModal(modalAdd);

  const cardData = {
    name: modalAddForm.elements["add-name"].value,
    link: modalAddForm.elements["add-link"].value,
  };
  const card = new Card(cardData, "#card", handleImageClick);
  addCard(card.generateCard());
  modalAddForm.reset();
});

initializeCards(initialCards);
refreshEditInputs();
