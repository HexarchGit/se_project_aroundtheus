import {
  initialData,
  validateFormConfigObject,
  selectors,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

(({
  editPopupSelector,
  addPopupSelector,
  nameSelector,
  jobSelector,
  popupImageContainer,
  cardsContainer,
  buttonEditSelector,
  buttonAddSelector,
}) => {
  const formValidators = {};

  const imagePopup = new PopupWithImage(popupImageContainer);
  imagePopup.setEventListeners();

  const handleImageClick = (cardData) => {
    imagePopup.open(cardData);
  };

  const createCard = (cardData) => {
    const card = new Card(cardData, "#card", handleImageClick);
    return card.generateCard();
  };

  const cardList = new Section(
    {
      items: initialData,
      renderer: (data) => {
        cardList.addItem(createCard(data));
      },
    },
    cardsContainer
  );
  cardList.renderItems();

  const userInfo = new UserInfo({ nameSelector, jobSelector });

  const handlePopupEdit = (inputs) => {
    userInfo.setUserInfo({
      newName: inputs["edit-name"],
      newJob: inputs["edit-job"],
    });
  };

  const handlePopupAdd = (inputs) => {
    cardList.addItem(
      createCard({ name: inputs["add-name"], link: inputs["add-link"] })
    );
  };

  const popupEdit = new PopupWithForm({
    selector: editPopupSelector,
    callback: handlePopupEdit,
  });
  popupEdit.setEventListeners();

  const popupAdd = new PopupWithForm({
    selector: addPopupSelector,
    callback: handlePopupAdd,
  });
  popupAdd.setEventListeners();

  const refreshEditInputs = () => {
    const { name, job } = userInfo.getUserInfo();
    popupEdit.setInputsValues({ "edit-name": name, "edit-job": job });
  };

  ((config) => {
    const validatedForms = [];
    validatedForms.push(popupEdit.getForm());
    validatedForms.push(popupAdd.getForm());
    validatedForms.forEach((form) => {
      formValidators[form.name] = new FormValidator(form, config);
      formValidators[form.name].enableValidation();
    });
  })(validateFormConfigObject);

  //editButton
  document.querySelector(buttonEditSelector).addEventListener("click", () => {
    popupEdit.open();
    refreshEditInputs();
    formValidators["edit-form"].resetValidation();
  });

  //addButton
  document.querySelector(buttonAddSelector).addEventListener("click", () => {
    popupAdd.open();
    formValidators["add-form"].resetValidation();
  });
})(selectors);
