import Card from './Card.js';
import FormValidator from './FormValidator.js';


//Список карточек
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const pictureSection = document.querySelector('.pictures');
let popupImageElement = document.querySelector('.picture-popup')

const validationConfig = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save',
  inputInvalidClass: 'popup__field_state_invalid',
  buttonInvalidClass: 'popup__save_state_invalid'
};

// Переменные для попапа редактирования имени и профессии
const editPopup = document.querySelector('.edit-popup');
const editPopupForm = editPopup.querySelector('.popup__form');
const editPopupNameField = editPopup.querySelector('.popup__field_type_name');
const editPopupProfessionField = editPopup.querySelector('.popup__field_type_title');
const editPopupOpenButton = document.querySelector('.profile__edit-button');
const profileField = document.querySelector('.profile__name');
const professionField = document.querySelector('.profile__profession');
const editPopupFormValidator = new FormValidator(validationConfig, editPopupForm)
editPopupFormValidator.enableValidation()

//Переменные для попапа на добавление новой карточки
const addPopup = document.querySelector('.add-popup');
const addPopupForm = addPopup.querySelector('.popup__form');
const addPopupImageNameField = addPopup.querySelector('.popup__field_type_image-name');
const addPopupImageLinkField = addPopup.querySelector('.popup__field_type_image-link');
const addPopupOpenButton = document.querySelector('.profile__add-button');
const addPopupFormValidator = new FormValidator(validationConfig, addPopupForm)
addPopupFormValidator.enableValidation()

const escKeyCode = 27;

initialCards.forEach((item) => {
	const card = new Card(item, '#pictures', openPopup, popupImageElement);
	const cardElement = card.generateCard();
	pictureSection.append(cardElement);
});

// обработчик открытия попапов
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEscHandler); 
  popupElement.addEventListener('mousedown', popupOverlayClickHandler);
}

// обработчики закрытия попапа на оверлей и на кнопку esc
function closeOnEscHandler(event) {
  if(event.keyCode === escKeyCode) {
    closePopup(document.querySelector('.popup_opened'));
    event.preventDefault();
  }
}

function popupOverlayClickHandler(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target)
  }
  if (event.target.classList.contains('popup__close')) {
    closePopup(event.target.closest('.popup_opened'))
  }
}

function clearValidErrors(popupElement) {
  popupElement.querySelectorAll('.popup__field').forEach((input_element) => {
      input_element.classList.remove('popup__field_state_invalid');  
  })
  popupElement.querySelectorAll('.error').forEach((error_element) => {
      error_element.textContent = '';
  })
}

function clearPopupErrors(popupElement) {
  if (Boolean(popupElement.querySelector('.popup__field'))) {
    clearValidErrors(popupElement);
  }
}

// обработчики закрытия попапов
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEscHandler); 
  popupElement.removeEventListener('mousedown', popupOverlayClickHandler);
  // без вызова метода ниже не будут очищаться ошибки валидации
  clearPopupErrors(popupElement);
}

// обработчики попапа редактирования имени и профессии
function showEditPopup() {
  editPopupNameField.value = profileField.textContent;
  editPopupProfessionField.value = professionField.textContent;
  openPopup(editPopup)
  // без строчки ниже кнопка будет неактивная при повторном открытии попапа редактирования
  editPopupFormValidator.setButtonState();
}
function submitEditPopupForm(event) {
  event.preventDefault();
  profileField.textContent = editPopupNameField.value;
  professionField.textContent = editPopupProfessionField.value;
  closePopup(editPopup);
  editPopupNameField.value = profileField.textContent;
  editPopupProfessionField.value = professionField.textContent;
}

// обработчики попапа добавления карточки
function showAddPopup() {
  addPopupImageNameField.value = '';
  addPopupImageLinkField.value = '';
  openPopup(addPopup);
}

function submitAddPopupForm(event) {
  event.preventDefault();
  let item = {
    name: addPopupImageNameField.value,
    link: addPopupImageLinkField.value
  }
  const card = new Card(item, '#pictures', openPopup, popupImageElement);
	const cardElement = card.generateCard();
  pictureSection.prepend(cardElement);
  closePopup(addPopup);
}

// кнопки обработки попапа редактирования имени и профессии
editPopupOpenButton.addEventListener('click', showEditPopup);
editPopupForm.addEventListener('submit', submitEditPopupForm);

// кнопки обработки попапа добавления новой карточки
addPopupOpenButton.addEventListener('click', showAddPopup);
addPopupForm.addEventListener('submit', submitAddPopupForm);
