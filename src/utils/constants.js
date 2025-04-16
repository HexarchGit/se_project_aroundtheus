const initialData = [
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

const selectors = {
  editPopupSelector: "#modal-edit",
  addPopupSelector: "#modal-add",
  confirmPopupSelector: "#modal-confirm",
  nameSelector: ".profile__name",
  aboutSelector: ".profile__description",
  popupImageContainer: "#modal-image-container",
  cardsContainer: ".elements__list",
  buttonEditSelector: ".profile__button_type_edit",
  buttonAddSelector: ".profile__button_type_add",
  photoSelector: ".profile__photo",
  editAvatarPopupSelector: "#modal-edit-avatar",
  profileAvatarSelector: ".profile__avatar",
};

const APIdata = {
  url: "https://around-api.en.tripleten-services.com/v1",
  token: "9711a792-8332-4754-8b11-0fe0d4037fb9",
};

export { initialData, validateFormConfigObject, selectors, APIdata };
