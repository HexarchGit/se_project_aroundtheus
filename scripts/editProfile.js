document
  .querySelector(".profile__button_type_edit")
  .addEventListener("click", function () {
    let modal = document.querySelector(".modal");
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
