import * as constants from'./../utils/constants.js'

export default class FormValidator {
    constructor(config, form) {
		this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inputInvalidClass = config.inputInvalidClass;
        this._buttonInvalidClass = config.buttonInvalidClass;
        this._form = form;
        this._submitButton = form.querySelector(this._submitButtonSelector);
    }

    _showError(input) {           
        input.classList.add(this._inputInvalidClass);
    }

    _generateError(input) {
        const error = this._form.querySelector(`#${input.id}-error`);
        if (input.validity.tooShort){
            error.textContent = `Минимальное количество символов: 2. Длина текста сейчас ${input.value.length}` + ` символ.`;  
        }  
        if (input.validity.valueMissing){  
            error.textContent = "Вы пропустили это поле.";  
        }   
        if (input.validity.patternMismatch){  
            error.textContent = "Введите адрес сайта.";  
        }            
    }
      
    _hideError(input){
        const error = this._form.querySelector(`#${input.id}-error`);
        error.textContent = ''
        input.classList.remove(this._inputInvalidClass); 
    }
      
    _checkValidity(input){
        if (!input.validity.valid) {
            this._generateError(input);
            this._showError(input);
        }
        else {
            this._hideError(input);
        }
    }
      
    setButtonState(){
        if(this._form.checkValidity()){
            this._submitButton.classList.remove(this._buttonInvalidClass);
            this._submitButton.disabled = false;
        }
        else {
            this._submitButton.classList.add(this._buttonInvalidClass);
            this._submitButton.disabled = true;
        }
    }
      
    _setEventListeners(){
        const inputLists = this._form.querySelectorAll(this._inputSelector)
    
        inputLists.forEach((input) => {
            input.addEventListener('input', ()=> {
              this._checkValidity(input);
              this.setButtonState()
            });
        });
    }

    enableValidation(){
        this._setEventListeners();    
        this.setButtonState()
    }

    clearValidErrors() {
        this._form.querySelectorAll(constants.validationConfig.inputSelector).forEach((input_element) => {
            input_element.classList.remove(constants.validationConfig.inputInvalidClass);  
        })
        this._form.querySelectorAll(constants.validationConfig.errorSelector).forEach((error_element) => {
            error_element.textContent = '';
        })
    }
}
