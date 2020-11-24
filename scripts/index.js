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

//Переменные для template
const pictureSection = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#pictures').content;

// Переменные для попапа редактирования имени и профессии
const editPopup = document.querySelector('.edit-popup');
const editPopupForm = editPopup.querySelector('.popup__form');
const editPopupNameField = editPopup.querySelector('.popup__field_type_name');
const editPopupProfessionField = editPopup.querySelector('.popup__field_type_title');
const editPopupOpenButton = document.querySelector('.profile__edit-button');
const profileField = document.querySelector('.profile__name');
const professionField = document.querySelector('.profile__profession');

//Переменные для попапа на добавление новой карточки
const addPopup = document.querySelector('.add-popup');
const addPopupForm = addPopup.querySelector('.popup__form');
const addPopupImageNameField = addPopup.querySelector('.popup__field_type_image-name');
const addPopupImageLinkField = addPopup.querySelector('.popup__field_type_image-link');
const addPopupOpenButton = document.querySelector('.profile__add-button');

//Переменные для попапа картинки
const picturePopup = document.querySelector('.picture-popup')
const picturePopupImage = picturePopup.querySelector('.picture-popup__image');
const picturePopupText = picturePopup.querySelector('.picture-popup__text');

const escKeyCode = 27;

// обработчик открытия попапов
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeOnEscHandler); 
  popupElement.addEventListener('mousedown', popupOverlayClickHandler);
}

//Создание карточки и обработка лайка, кнопки удаления, попапа картинки
function createPictureElement(name, link) {
  const pictureElement = pictureTemplate.cloneNode(true);
  const cardImage = pictureElement.querySelector('.pictures__img');
  pictureElement.querySelector('.pictures__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  pictureElement.querySelector('.pictures__like').addEventListener('click', event => {
    event.currentTarget.classList.toggle('pictures__like_black');
  });
  pictureElement.querySelector('.pictures__img-delete').addEventListener('click', event => {
    event.target.parentElement.remove();
  });

  //Попап картинки
  cardImage.addEventListener('click', () => {
    openPopup(picturePopup);
    picturePopupImage.src = event.target.src
    picturePopupImage.alt = event.target.alt
    picturePopupText.textContent = event.target.alt
  });
  return pictureElement;
}

// инициализация карточек при загрузке страницы
function initPictureElement(item) {
  const pictureElement = createPictureElement(item['name'],item['link']);
  pictureSection.append(pictureElement);
}
initialCards.forEach(initPictureElement);

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
    closePopup(event.target.parentElement.parentElement)
  }
}

// обработчики закрытия попапов
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeOnEscHandler); 
  popupElement.removeEventListener('mousedown', popupOverlayClickHandler);
  if (Boolean(popupElement.querySelector('.popup__field'))) {
    clearValidErrors(popupElement);
  }
}

// обработчики попапа редактирования имени и профессии
function showEditPopup() {
  openPopup(editPopup)
  editPopupNameField.value = profileField.textContent;
  editPopupProfessionField.value = professionField.textContent;
  const submitButton = editPopupForm.querySelector(validationConfig.submitButtonSelector);
  setButtonState(submitButton, editPopupForm.checkValidity(), validationConfig)
}
function submitEditPopupForm(event) {
  event.preventDefault();
  profileField.textContent = editPopupNameField.value;
  professionField.textContent = editPopupProfessionField.value;
  closePopup(editPopup);
}

// обработчики попапа добавления карточки
function showAddPopup() {
  openPopup(addPopup);
  addPopupImageNameField.value = '';
  addPopupImageLinkField.value = '';
  const submitButton = addPopupForm.querySelector(validationConfig.submitButtonSelector);
  setButtonState(submitButton, addPopupForm.checkValidity(), validationConfig)
}
function submitAddPopupForm(event) {
  event.preventDefault();
  const pictureElement = createPictureElement(addPopupImageNameField.value, addPopupImageLinkField.value);
  pictureSection.prepend(pictureElement);
  closePopup(addPopup);
}

// кнопки обработки попапа редактирования имени и профессии
editPopupOpenButton.addEventListener('click', showEditPopup);
editPopupForm.addEventListener('submit', submitEditPopupForm);

// кнопки обработки попапа добавления новой карточки
addPopupOpenButton.addEventListener('click', showAddPopup);
addPopupForm.addEventListener('submit', submitAddPopupForm);



