//Валидация трех форм
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save',
    inputInvalidClass: 'popup__field_state_invalid',
    buttonInvalidClass: 'popup__save_state_invalid'
  };
  
  function showError(form, input, config){
    const error = form.querySelector(`#${input.id}-error`);
    if (input.validity.tooShort){
        error.textContent = `Минимальное количество символов: 2. Длина текста сейчас ${input.value.length}` + ` символ.`;  
    }  
    if (input.validity.valueMissing){  
        config.inputSelector.style = "margin-top: 0.3rem;"
        error.textContent = "Вы пропустили это поле.";  
    }   
    if (input.validity.patternMismatch){  
        config.inputSelector.style = "margin-top: 0.3rem;"
        error.textContent = "Введите адрес сайта.";  
    }            
    input.classList.add(config.inputInvalidClass);
  }
  
  function hideError(form, input, config){
    const error = form.querySelector(`#${input.id}-error`);
    error.textContent = ''
    input.classList.remove(config.inputInvalidClass);
  }

  function clearValidErrors(popupElement) {
    popupElement.querySelectorAll('.popup__field').forEach((input_element) => {
      input_element.classList.remove('popup__field_state_invalid');  
    })
    popupElement.querySelectorAll('.error').forEach((error_element) => {
      error_element.textContent = '';
    })
    editPopupNameField.value = profileField.textContent;
    editPopupProfessionField.value = professionField.textContent;
  }
  
  function checkValidity(form, input, config){
    console.log(form.validity)
    if (!input.validity.valid) {
        showError(form, input, config);
    }
    else {
        hideError(form, input, config);
    }
  }
  
  function setButtonState(button, isActive, config){
    if(isActive){
        button.classList.remove(config.buttonInvalidClass);
        button.disabled = false;
    }
    else {
        button.classList.add(config.buttonInvalidClass);
        button.disabled = true;
    }
  }
  
  function setEventListeners(form, config){
    const inputLists = form.querySelectorAll(config.inputSelector)
    const submitButton = form.querySelector(config.submitButtonSelector);
  
    inputLists.forEach((input) => {
        input.addEventListener('input', ()=> {
        checkValidity(form, input, config);
        setButtonState(submitButton, form.checkValidity(), config)
        });
    });
  }
  
  function enableValidation(config){
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((form) => {
        console.log(form)
        setEventListeners(form, config);
  
        const submitButton = form.querySelector(config.submitButtonSelector);
        setButtonState(submitButton, form.checkValidity(), config)
    });
  }
  
  enableValidation(validationConfig);

