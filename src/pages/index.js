import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js'
import Popup from '../components/Popup.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js'
import './../pages/index.css';
import * as constants from'./../utils/constants.js'
import Api from '../components/Api.js'
import { data } from 'jquery';


const userInfo = new UserInfo(constants.userInfoConfig);

//Переменные для попапа на редактирование информации профиля
const editFieldName = document.querySelector('.popup__field_type_name') 
const editFieldProfession = document.querySelector('.popup__field_type_title')
const editPopupOpenButton = document.querySelector('.profile__edit-button');

const deletePopupButton = document.querySelector('.alert-popup__save')

const api = new Api('https://mesto.nomoreparties.co', '1ab95744-b66b-4860-b7ff-75c4243c7033', 'cohort-19', 'v1')
api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo([data.name, data.about]);
    userInfo.setUserImage(data.avatar);
    userInfo.setUserId(data._id);
  })

const submitEditCallback = (inputValues) => {
  editPopup.popupForm.querySelector('.popup__save').textContent = "Сохранение..."
  debugger;
  api.setUserInfo(inputValues[0], inputValues[1])
    .then(data => {
      userInfo.setUserInfo([data.name, data.about]);
    }) 
  editPopup.popupForm.querySelector('.popup__save').textContent = "Сохранить"
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
    name: inputValues[0],
    link: inputValues[1]
  }
  addPopup.popupForm.querySelector('.popup__save').textContent = "Сохранение..."
  api.createNewCard(item)
    .then(data => {
      pictureSection.addItem(data);
    })
  addPopup.popupForm.querySelector('.popup__save').textContent = "Сохранить"
}

const addPopup = new PopupWithForm(constants.addPopupSelector, submitAddCallback);
addPopup.setEventListeners();
const addPopupFormValidator = new FormValidator(constants.validationConfig, addPopup.popupForm);
addPopupFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(constants.picturePopupSelector);
const handleCardImageClick = (name, link) => {
  popupWithImage.setEventListeners();
  popupWithImage.open(link, name);
}


const popupConfirmDelete = new Popup(constants.confirmDeletePopupSelector)
const handleDeleteCardClick = (card) => {
  popupConfirmDelete.setEventListeners();
  popupConfirmDelete.open();
  const confirmYesButton = document.querySelector('.alert-popup__save')
  confirmYesButton.addEventListener('click', event => {
    api.deleteCard(card.getCardId())
      .then(data => {
        card.removeCard();
      })
    popupConfirmDelete.close();
  });
}

const handleLikeCardClick = (card) => {
  if (card.isLiked()) {
    api.deleteLikeCard(card.getCardId())
    .then(data => {
      card.removeCardLike();
    })
  }
  else {
    api.likeCard(card.getCardId())
    .then(data => {
      card.addCardLike();
    })
  }
}

const addCardRenderer = (item) => {
  const card = new Card(item, constants.pictureTemplateSelector, handleCardImageClick, handleDeleteCardClick, handleLikeCardClick);
  return card.generateCard(userInfo.getUserId());
}
const pictureSection = new Section(constants.pictureSectionSelector, addCardRenderer);

api.getCards()
  .then(data => {
    pictureSection.setItems(data.reverse());
    pictureSection.renderAll();
  })

const submitUpdateCallback = (inputValues) => {
  updatePopup.popupForm.querySelector('.popup__save').textContent = "Сохранение..."
  api.changeImage(inputValues[0])
    .then(data => {
      userInfo.setUserImage(inputValues[0])
    })
  updatePopup.popupForm.querySelector('.popup__save').textContent = "Сохранить"
}
const updatePopupOpenButton = document.querySelector('.profile__img');
const updatePopup = new PopupWithForm(constants.updatePopupSelector, submitUpdateCallback);
updatePopup.setEventListeners();
const updatePopupFormValidator = new FormValidator(constants.validationConfig, updatePopup.popupForm);
updatePopupFormValidator.enableValidation();


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
  addPopupFormValidator.setButtonState();
  addPopupFormValidator.clearValidErrors();
});

updatePopupOpenButton.addEventListener('click', () => {
  updatePopup.open();
  updatePopupFormValidator.setButtonState();
  updatePopupFormValidator.clearValidErrors();
})
