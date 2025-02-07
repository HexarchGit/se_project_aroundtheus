const validateConfigObject = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button_type_submit",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_active",
};

const showError = (form, input, error) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.add(error.errorClass);
  input.classList.add(error.inputErrorClass);
  errorElement.textContent = error.message;
};

const hideError = (form, input, error) => {
  const errorElement = form.querySelector(`.${input.id}-error`);
  errorElement.classList.remove(error.errorClass);
  input.classList.remove(error.inputErrorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (form, input, error) => {
  error.message = input.validationMessage;
  if (!input.validity.valid) {
    showError(form, input, error);
  } else {
    hideError(form, input, error);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const enableButton = (button) => {
  button.element.classList.add(button.inactiveClass);
  button.element.disabled = true;
};

const disableButton = (button) => {
  button.element.classList.remove(button.inactiveClass);
  button.element.disabled = false;
};

const toggleButton = (inputList, button) => {
  hasInvalidInput(inputList) ? enableButton(button) : disableButton(button);
};

const validate = (validationParams) => {
  checkInputValidity(
    validationParams.form,
    validationParams.input,
    validationParams.error
  );
  toggleButton(validationParams.inputsList, validationParams.buttonElement);
};

const setInputsListener = (validationParams) => {
  toggleButton(validationParams.inputsList, validationParams.buttonElement);
  validationParams.inputsList.forEach((input) => {
    input.addEventListener("input", () => {
      validationParams.input = input;
      validate(validationParams);
    });
  });
  const openButtons = Array.from(document.querySelectorAll(".profile__button"));
  openButtons.forEach((button) =>
    button.addEventListener("click", () => {
      validationParams.inputsList.forEach((input) => {
        validationParams.input = input;
        validate(validationParams);
      });
    })
  );
};

const enableValidation = (config) => {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));
  formsList.forEach((form) => {
    const error = {
      inputErrorClass: config.inputErrorClass,
      errorClass: config.errorClass,
    };
    const inputsList = Array.from(form.querySelectorAll(config.inputSelector));
    const submitButton = form.querySelector(config.submitButtonSelector);
    const buttonElement = {
      element: submitButton,
      inactiveClass: config.inactiveButtonClass,
    };
    const validationParams = { form, inputsList, buttonElement, error };
    setInputsListener(validationParams);
  });
};

enableValidation(validateConfigObject);
