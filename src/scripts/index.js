import Card from './Card.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js'
import UserInfo from './UserInfo.js';
import PopupWithImage from './PopupWithImage.js';
import './../pages/index.css';

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


const validationConfig = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save',
  inputInvalidClass: 'popup__field_state_invalid',
  buttonInvalidClass: 'popup__save_state_invalid'
};

const editPopupOpenButton = document.querySelector('.profile__edit-button');
const userInfo = new UserInfo('.profile__name', '.profile__profession');

const submitEditCallback = (event) => {
  event.preventDefault();
  userInfo.setUserInfo();
}

const handleCardClick = (name, link) => {
  const popupWithImage = new PopupWithImage('.picture-popup', link, name);
  popupWithImage.open();
}

const editPopup = new PopupWithForm('.edit-popup', submitEditCallback, validationConfig)
editPopup.setEventListeners();


//Переменные для попапа на добавление новой карточки
const addPopupImageNameField = document.querySelector('.popup__field_type_image-name');
const addPopupImageLinkField = document.querySelector('.popup__field_type_image-link');
const addPopupOpenButton = document.querySelector('.profile__add-button');

const submitAddCallback = (event) => {
  event.preventDefault();
  let item = {
    name: addPopupImageNameField.value,
    link: addPopupImageLinkField.value
  }
  pictureSection.addItem(item);
}

const addPopup = new PopupWithForm('.add-popup', submitAddCallback, validationConfig)
addPopup.setEventListeners();


const pictureSectionData = {
  items: initialCards,
  renderer: ((item) => {
      const card = new Card(item, '#pictures', handleCardClick);
      return card.generateCard();
  })
}

const pictureSection = new Section(pictureSectionData, '.pictures');
pictureSection.renderAll();

// кнопки обработки попапа редактирования имени и профессии
editPopupOpenButton.addEventListener('click', () => {
  userInfo.getUserInfo();
  editPopup.open()
});

// кнопки обработки попапа добавления новой карточки
addPopupOpenButton.addEventListener('click', () => {
  addPopupImageNameField.value = '';
  addPopupImageLinkField.value = '';
  addPopup.open()
});
