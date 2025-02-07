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
const modalImage = document.querySelector("#modal-image");
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

const closeModal = (modal) => modal.classList.remove("modal_opened");
const openModal = (modal) => modal.classList.add("modal_opened");

const escHandler = (event) => {
  if (event.key == "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
    document.removeEventListener("keydown", escHandler);
  }
};

const closeHandler = (event) => {
  if (
    event.target.classList.contains("modal__button_type_close") ||
    event.target == event.currentTarget
  ) {
    closeModal(event.target.closest(".modal"));
    event.target.closest(".modal").removeEventListener("click", closeHandler);
  }
};

const setCloseListener = (modal) => {
  modal.addEventListener("mousedown", closeHandler);
  document.addEventListener("keydown", escHandler);
};

const modalHandlerOpen = (modal) => {
  openModal(modal);
  setCloseListener(modal);
};

const imageClickHandler = (item) => {
  const image = modalImage.querySelector(".modal__image");
  image.src = item.src;
  image.alt = item.alt;
  modalImage.querySelector(".modal__image-name").textContent = item.alt;
  modalHandlerOpen(modalImage);
};

const setCardListeners = (card) => {
  card.image.addEventListener("click", (event) =>
    imageClickHandler(event.target)
  );
  card.buttonLike.addEventListener("click", (event) =>
    event.target.classList.toggle("card__button-like_state_active")
  );
  card.buttonDelete.addEventListener("click", (event) =>
    event.target.closest(".card").remove()
  );
};

const generateCardElement = (data) => {
  const cardElement = document
    .querySelector("#card")
    .content.querySelector(".card")
    .cloneNode(true);
  cardElement.querySelector(".card__name").textContent = data.name;

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = data.link;
  cardImage.alt = data.name;

  const cardButtonLike = cardElement.querySelector(".card__button-like");
  const cardButtonDelete = cardElement.querySelector(".card__button-delete");

  const card = {
    image: cardImage,
    buttonLike: cardButtonLike,
    buttonDelete: cardButtonDelete,
  };
  setCardListeners(card);
  return cardElement;
};

const addCard = (data) => cardsList.prepend(generateCardElement(data));

const initializeCards = (initialData) =>
  initialData.forEach((cardData) => addCard(cardData));

buttonEdit.addEventListener("click", () => {
  modalHandlerOpen(modalEdit);
  modalEditFormName.value = profileName.textContent;
  modalEditFormDescription.value = profileDescription.textContent;
});

modalEditForm.addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    profileName.textContent = modalEditFormName.value;
    profileDescription.textContent = modalEditFormDescription.value;
    closeModal(modalEdit);
  },
  true
);

buttonAdd.addEventListener("click", (event) => {
  modalHandlerOpen(modalAdd);
});

modalAddForm.addEventListener(
  "submit",
  function (event) {
    event.preventDefault();
    const cardData = {
      name: modalAddForm.elements["add-name"].value,
      link: modalAddForm.elements["add-link"].value,
    };
    addCard(cardData);
    closeModal(modalAdd);
    modalAddForm.reset();
  },
  true
);

initializeCards(initialCards);
