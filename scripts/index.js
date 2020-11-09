// Переменные для попапа редактирования имени и профессии
const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup__container');
const popupTitle = document.querySelector('.popup__text');

const popupCloseButton = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit-button');

const profile = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');

const form = document.querySelector('.popup__form');
const nameField = document.querySelector('.popup__field_type_name');
const professionField = document.querySelector('.popup__field_type_title');

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

//Переменные для попапа на добавление новой карточки
const addPopup = document.querySelector('.add-popup');
const addPopupCloseButton = document.querySelector('.add-popup__close');
const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.add-popup__form');
const imageNameField = document.querySelector('.add-popup__field_type_image-name');
const imageLinkField = document.querySelector('.add-popup__field_type_image-link');

//Переменные для попапа картинки
const picturePopup = document.querySelector('.picture-popup')
const picturePopupCloseButton = document.querySelector('.picture-popup__close');
const picture = document.querySelector('.picture-popup__image');
const pictureText = document.querySelector('.picture-popup__text');

// попап редактирования имени и профессии
function showPopup() {
  popup.classList.add('popup_opened');
  nameField.value = profile.textContent;
  professionField.value = profession.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened')
}

function popupClickHandler(event) {
  if (event.target.classList.contains('popup')) {
    closePopup()
  }
}

function submitForm(event) {
  event.preventDefault();
  profile.textContent = nameField.value;
  profession.textContent = professionField.value;
  closePopup();
}

//Попап картинки
function showPicturePopup() {
  picturePopup.classList.add('picture-popup_opened');
}

function closePicturePopup() {
  picturePopup.classList.remove('picture-popup_opened')
}

function picturePopupClickHandler(event) {
  if (event.target.classList.contains('picture-popup')) {
    closePicturePopup()
  }
}

//Создание карточки и обработка лайка, кнопки удаления, попапа картинки
function createPictureElement(name, link) {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.pictures__title').textContent = name;
  pictureElement.querySelector('.pictures__img').src = link;
  pictureElement.querySelector('.pictures__img').alt = name;
  pictureElement.querySelector('.pictures__like').addEventListener('click', event => {
    event.currentTarget.classList.toggle('pictures__like_black');
  });
  pictureElement.querySelector('.pictures__img-delete').addEventListener('click', event => {
    event.target.parentElement.remove();
  });
  pictureElement.querySelector('.pictures__img').addEventListener('click', event => {
    showPicturePopup();
    picture.src = event.target.src
    picture.alt = event.target.alt
    pictureText.textContent = event.target.alt
  });
  return pictureElement;
}

// инициализация карточек при загрузке страницы
function initPictureElement(item) {
  const pictureElement = createPictureElement(item['name'],item['link']);
  pictureSection.append(pictureElement);
}

initialCards.forEach(initPictureElement);

//Попап добавления карточки
function showAddPopup() {
  addPopup.classList.add('popup_opened');
  imageNameField.value = '';
  imageLinkField.value = '';
}

function closeAddPopup() {
  addPopup.classList.remove('popup_opened')
}

function addPopupClickHandler(event) {
  if (event.target.classList.contains('add-popup')) {
    closeAddPopup()
  }
}

function addSubmitForm(event) {
  event.preventDefault();
  const pictureElement = createPictureElement(imageNameField.value, imageLinkField.value);
  pictureSection.prepend(pictureElement);
  closeAddPopup();
}

// кнопки обработки попапа редактирования имени и профессии
editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('mousedown', popupClickHandler)
form.addEventListener('submit', submitForm);

// кнопки обработки попапа добавления новой карточки
addButton.addEventListener('click', showAddPopup);
addPopupCloseButton.addEventListener('click', closeAddPopup);
addPopup.addEventListener('mousedown', addPopupClickHandler)
addForm.addEventListener('submit', addSubmitForm);

// кнопки обработки попапа картинки
picturePopupCloseButton.addEventListener('click', closePicturePopup);
picturePopup.addEventListener('mousedown', picturePopupClickHandler);