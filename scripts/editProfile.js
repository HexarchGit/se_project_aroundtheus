let modal = document.querySelector(".modal");

document
  .querySelector(".profile__button_type_edit")
  .addEventListener("click", function () {
    modal.classList.add("modal__opened");
    modal.querySelector("#name").value =
      document.querySelector(".profile__name").textContent;
    modal.querySelector("#caption").value =
      document.querySelector(".profile__caption").textContent;
  });

document
  .querySelector(".modal__button_type_close")
  .addEventListener("click", function () {
    document.querySelector(".modal").classList.remove("modal__opened");
  });

document
  .querySelector(".modal__form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    document.querySelector(".profile__name").textContent =
      modal.querySelector("#name").value;
    document.querySelector(".profile__caption").textContent =
      modal.querySelector("#caption").value;
    document.querySelector(".modal").classList.remove("modal__opened");
  });
