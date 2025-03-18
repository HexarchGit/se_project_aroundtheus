import {
  initialData,
  validateFormConfigObject,
  selectors,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

const {
  editPopupSelector,
  addPopupSelector,
  nameSelector,
  jobSelector,
  popupImageContainer,
} = selectors;

const cardsList = document.querySelector(".elements__list");
const buttonEdit = document.querySelector(".profile__button_type_edit");
const buttonAdd = document.querySelector(".profile__button_type_add");
const editInputName = document.querySelector("#edit-name");
const editInputJob = document.querySelector("#edit-job");

const formValidators = {};

const addCard = (generatedCard) => cardsList.prepend(generatedCard);

const handleImageClick = (cardData) => {
  const imagePopup = new PopupWithImage(popupImageContainer);
  imagePopup.open(cardData);
  imagePopup.setEventListeners();
};

const createCard = (cardData) => {
  const card = new Card(cardData, "#card", handleImageClick);
  return card.generateCard();
};

const initializeCards = (initialData) => {
  initialData.forEach((cardData) => {
    addCard(createCard(cardData));
  });
};

const enableFormsValidation = (config) => {
  Array.from(document.forms).forEach((form) => {
    formValidators[form.name] = new FormValidator(form, config);
    formValidators[form.name].enableValidation();
  });
};

const userInfo = new UserInfo({ nameSelector, jobSelector });

const handlePopupEdit = (inputs) => {
  userInfo.setUserInfo({
    newName: inputs["edit-name"],
    newJob: inputs["edit-job"],
  });
};

const handlePopupAdd = (inputs) => {
  addCard(createCard({ name: inputs["add-name"], link: inputs["add-link"] }));
};

const popupEdit = new PopupWithForm({
  selector: editPopupSelector,
  callback: handlePopupEdit,
});

const popupAdd = new PopupWithForm({
  selector: addPopupSelector,
  callback: handlePopupAdd,
});

const refreshEditInputs = () => {
  const { name, job } = userInfo.getUserInfo();
  editInputName.value = name;
  editInputJob.value = job;
};

buttonEdit.addEventListener("click", () => {
  popupEdit.open();
  refreshEditInputs();
  formValidators["edit-form"].resetValidation();
});

buttonAdd.addEventListener("click", () => {
  popupAdd.open();
  formValidators["add-form"].resetValidation();
});

popupEdit.setEventListeners();
popupAdd.setEventListeners();
initializeCards(initialData);
enableFormsValidation(validateFormConfigObject);
