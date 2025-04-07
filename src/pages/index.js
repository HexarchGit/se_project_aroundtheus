import {
  validateFormConfigObject,
  selectors,
  APIdata,
  initialData,
} from "../utils/constants.js";

import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithConfimration from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";
import Api from "../components/API.js";

(({
  editPopupSelector,
  addPopupSelector,
  confirmPopupSelector,
  nameSelector,
  aboutSelector,
  popupImageContainer,
  cardsContainer,
  buttonEditSelector,
  buttonAddSelector,
  photoSelector,
  editAvatarPopupSelector,
  profileAvatarSelector,
}) => {
  const formValidators = {};

  const imagePopup = new PopupWithImage(popupImageContainer);
  imagePopup.setEventListeners();

  const tripletenApi = new Api(APIdata);

  const userInfo = new UserInfo({ nameSelector, aboutSelector, photoSelector });

  const handleImageClick = (cardData) => {
    imagePopup.open(cardData);
  };

  const handleApiCallback = ({ action, endpoint }) => {
    return tripletenApi.editCard(action, endpoint);
  };

  const popupConfirm = new PopupWithConfimration(confirmPopupSelector);
  popupConfirm.setEventListeners();

  const handleCardDelete = () => {
    return popupConfirm.open();
  };

  const createCard = (cardData) => {
    const card = new Card(
      cardData,
      "#card",
      handleImageClick,
      handleApiCallback,
      handleCardDelete
    );
    return card.generateCard();
  };

  const cardList = new Section(
    {
      items: [],
      renderer: (data) => {
        cardList.addItem(createCard(data));
      },
    },
    cardsContainer
  );

  const initialize = () => {
    tripletenApi
      .getUser()
      .then((result) => {
        userInfo.setUserInfo(result);
      })
      .catch((error) => console.error(error));

    tripletenApi
      .getCard()
      .then((result) => {
        cardList.setItems(result.reverse());
        cardList.renderItems();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //for adding bulk of initial cards on loading page
  //raw code for future feature
  // const addCardsBulk = (cardsData) => {
  //   cardsData.forEach((card) => {
  //     tripletenApi
  //       .addCard(card)
  //       .then((response) => cardList.addItem(response))
  //       .catch((error) => console.error(error));
  //   });
  // };

  // addCardsBulk(initialData);

  const handlePopupEdit = (inputs) => {
    const inputData = {
      name: inputs["edit-name"],
      about: inputs["edit-job"],
    };
    return tripletenApi
      .editUser(inputData)
      .then(() => userInfo.setUserInfo(inputData))
      .catch((error) => console.error(error));
  };

  const handlePopupAdd = (inputs) => {
    const inputData = {
      name: inputs["add-name"],
      link: inputs["add-link"],
      avatar: userInfo.getUserInfo().avatar,
    };
    return tripletenApi
      .addCard(inputData)
      .then(() => cardList.addItem(createCard(inputData)))
      .catch((error) => console.error(error));
  };

  const handlePopupEditAvatar = (inputs) => {
    const { name, about } = userInfo.getUserInfo();
    const inputData = { name, about, avatar: inputs["edit-avatar"] };
    return tripletenApi
      .editUser(inputData)
      .then(() => userInfo.setUserInfo(inputData))
      .catch((error) => console.error(error));
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

  const popupEditAvatar = new PopupWithForm({
    selector: editAvatarPopupSelector,
    callback: handlePopupEditAvatar,
  });
  popupEditAvatar.setEventListeners();

  const refreshEditInputs = () => {
    const { name, about } = userInfo.getUserInfo();
    popupEdit.setInputsValues({ "edit-name": name, "edit-job": about });
  };

  initialize();

  ((config) => {
    const validatedForms = [];
    validatedForms.push(popupEdit.getForm());
    validatedForms.push(popupAdd.getForm());
    validatedForms.push(popupEditAvatar.getForm());
    validatedForms.forEach((form) => {
      formValidators[form.name] = new FormValidator(form, config);
      formValidators[form.name].enableValidation();
    });
  })(validateFormConfigObject);

  //editAvatar
  document
    .querySelector(profileAvatarSelector)
    .addEventListener("mousedown", () => {
      popupEditAvatar.open();
      formValidators[popupEditAvatar.getForm().name].resetValidation();
    });

  //editButton
  document.querySelector(buttonEditSelector).addEventListener("click", () => {
    popupEdit.open();
    refreshEditInputs();
    formValidators[popupEdit.getForm().name].resetValidation();
  });

  //addButton
  document.querySelector(buttonAddSelector).addEventListener("click", () => {
    popupAdd.open();
    formValidators[popupAdd.getForm().name].resetValidation();
  });
})(selectors);
