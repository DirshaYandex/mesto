import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js'
import './../pages/index.css';
import * as constants from'./../utils/constants.js'
import Api from '../components/Api.js'
import { data } from 'jquery';


const userInfo = new UserInfo(constants.userInfoConfig);

//Переменные для попапа на редактирование информации профиля
const editFieldName = document.querySelector(constants.editFieldNameSelector); 
const editFieldProfession = document.querySelector(constants.editFieldProfessionSelector);
const editPopupOpenButton = document.querySelector(constants.editPopupOpenButtonSelector);

const api = new Api({
  baseUrl: constants.baseUrl,
  headers: {
    authorization: constants.token,
    'Content-Type': 'application/json'
  }
});
api.getUserInfo()
  .then(data => {
    userInfo.setUserInfo([data.name, data.about]);
    userInfo.setUserImage(data.avatar);
    userInfo.setUserId(data._id);
  })
  .catch((err) => {
    console.log(err);
  });

const submitEditCallback = (inputValues) => {
  editPopup.saveButton.textContent = constants.saveButtonTextLoading;
  api.setUserInfo(inputValues[0], inputValues[1])
    .then(data => {
      userInfo.setUserInfo([data.name, data.about]);
    })
    .catch((err) => {
      console.log(err);
    });
  editPopup.saveButton.textContent = constants.saveButtonText;
}

const editPopup = new PopupWithForm(constants.editPopupSelector, submitEditCallback);
editPopup.setEventListeners();
const editPopupFormValidator = new FormValidator(constants.validationConfig, editPopup.popupForm);
editPopupFormValidator.enableValidation();

//Переменные для попапа на добавление новой карточки
const addPopupOpenButton = document.querySelector(constants.addPopupOpenButtonSelector);

const submitAddCallback = (inputValues) => {
  const item = {
    name: inputValues[0],
    link: inputValues[1]
  }
  addPopup.saveButton.textContent = constants.saveButtonTextLoading;
  api.createNewCard(item)
    .then(data => {
      pictureSection.addItem(data);
    })
    .catch((err) => {
      console.log(err);
    });
  addPopup.saveButton.textContent = constants.saveButtonText;
}

const addPopup = new PopupWithForm(constants.addPopupSelector, submitAddCallback);
addPopup.setEventListeners();

const addPopupFormValidator = new FormValidator(constants.validationConfig, addPopup.popupForm);
addPopupFormValidator.enableValidation();

const popupWithImage = new PopupWithImage(constants.picturePopupSelector);
popupWithImage.setEventListeners();

const handleCardImageClick = (name, link) => {
  popupWithImage.open(link, name);
}

const handleDeleteCardClick = (card) => {
  popupConfirmDelete.open();
  popupConfirmDelete.cardToDelete = card;
}

const submitDeleteCardCallback = () => {
  api.deleteCard(popupConfirmDelete.cardToDelete.getCardId())
  .then(data => {
    popupConfirmDelete.cardToDelete.removeCard();
  })
  .catch((err) => {
    console.log(err);
  });
}
const popupConfirmDelete = new PopupWithForm(constants.confirmDeletePopupSelector, submitDeleteCardCallback);
popupConfirmDelete.setEventListeners();

const handleLikeCardClick = (card) => {
  if (card.isLiked()) {
    api.deleteLikeCard(card.getCardId())
    .then(data => {
      card.setLikes(data.likes, userInfo.getUserId());
    })
    .catch((err) => {
      console.log(err);
    });
  }
  else {
    api.likeCard(card.getCardId())
    .then(data => {
      card.setLikes(data.likes, userInfo.getUserId());
    })
    .catch((err) => {
      console.log(err);
    });
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
  .catch((err) => {
    console.log(err);
  });

const submitUpdateCallback = (inputValues) => {
  updatePopup.saveButton.textContent = constants.saveButtonTextLoading;
  api.changeImage(inputValues[0])
    .then(data => {
      userInfo.setUserImage(inputValues[0])
    })
    .catch((err) => {
      console.log(err);
    });
  updatePopup.saveButton.textContent = constants.saveButtonText;
}
const updatePopupOpenButton = document.querySelector(constants.updatePopupOpenButtonSelector);
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
  addPopup.open()
  addPopupFormValidator.setButtonState();
  addPopupFormValidator.clearValidErrors();
});

updatePopupOpenButton.addEventListener('click', () => {
  updatePopup.open();
  updatePopupFormValidator.setButtonState();
  updatePopupFormValidator.clearValidErrors();
})
