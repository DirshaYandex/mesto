import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js'
import './../pages/index.css';
import * as constants from'./../utils/constants.js'


const userInfo = new UserInfo(constants.userInfoConfig);

//Переменные для попапа на редактирование информации профиля
const editFieldName = document.querySelector('.popup__field_type_name') 
const editFieldProfession = document.querySelector('.popup__field_type_title')
const editPopupOpenButton = document.querySelector('.profile__edit-button');

const submitEditCallback = (inputValues) => {
  userInfo.setUserInfo(inputValues);
}

const editPopup = new PopupWithForm(constants.editPopupSelector, submitEditCallback);
editPopup.setEventListeners();
const editPopupFormValidator = new FormValidator(constants.validationConfig, editPopup.popupForm);
editPopupFormValidator.enableValidation();

//Переменные для попапа на добавление новой карточки
const addPopupImageNameField = document.querySelector('.popup__field_type_image-name');
const addPopupImageLinkField = document.querySelector('.popup__field_type_image-link');
const addPopupOpenButton = document.querySelector('.profile__add-button');

const submitAddCallback = (inputValues) => {
  let item = {
    name: inputValues[0].value,
    link: inputValues[1].value
  }
  pictureSection.addItem(item);
}

const addPopup = new PopupWithForm(constants.addPopupSelector, submitAddCallback, constants.validationConfig);
addPopup.setEventListeners();
const addPopupFormValidator = new FormValidator(constants.validationConfig, addPopup.popupForm);
addPopupFormValidator.enableValidation();

const handleCardClick = (name, link) => {
  const popupWithImage = new PopupWithImage(constants.picturePopupSelector);
  popupWithImage.setEventListeners();
  popupWithImage.open(link, name);
}

const pictureSectionData = {
  items: constants.initialCards,
  renderer: ((item) => {
      const card = new Card(item, constants.pictureTemplateSelector, handleCardClick);
      return card.generateCard();
  })
}

const pictureSection = new Section(pictureSectionData, constants.pictureSectionSelector);
pictureSection.renderAll();

// кнопки обработки попапа редактирования имени и профессии
editPopupOpenButton.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  editFieldName.value = userData.name; 
  editFieldProfession.value = userData.profession; 
  editPopup.open()
  editPopupFormValidator.clearValidErrors();
  editPopupFormValidator.setButtonState();
});

// кнопки обработки попапа добавления новой карточки
addPopupOpenButton.addEventListener('click', () => {
  addPopupImageNameField.value = '';
  addPopupImageLinkField.value = '';
  addPopup.open()
  addPopupFormValidator.clearValidErrors();
});
