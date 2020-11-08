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

editButton.addEventListener('click', showPopup);
popupCloseButton.addEventListener('click', closePopup);
popup.addEventListener('mousedown', popupClickHandler)
form.addEventListener('submit', submitForm);

//еще больше js
//Заполнение карточками
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
const pictureTemplate = document.querySelector('#pictures').content;

function makePictureElement(item) {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.pictures__title').textContent = item['name'];
  pictureElement.querySelector('.pictures__img').src = item['link'];
  pictureElement.querySelector('.pictures__img').alt = item['name'];
  pictureSection.append(pictureElement);
}

initialCards.forEach(makePictureElement);

// Попап на добавление карточки

const addPopup = document.querySelector('.add-popup');
const addPopupCloseButton = document.querySelector('.add-popup__close');
const addButton = document.querySelector('.profile__add-button');
const addForm = document.querySelector('.add-popup__form');
const imageNameField = document.querySelector('.add-popup__field_type_image-name');
const imageLinkField = document.querySelector('.add-popup__field_type_image-link');


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
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.pictures__title').textContent = imageNameField.value;
  pictureElement.querySelector('.pictures__img').src  = imageLinkField.value;
  pictureElement.querySelector('.pictures__img').alt = imageNameField.value;
  pictureSection.prepend(pictureElement);
  closeAddPopup();
  selectAllLikes();
  selectDeleteButtons();
}

addButton.addEventListener('click', showAddPopup);
addPopupCloseButton.addEventListener('click', closeAddPopup);
addPopup.addEventListener('mousedown', addPopupClickHandler)
addForm.addEventListener('submit', addSubmitForm);

//Лайк
function likeClickHandler(event) {
  event.currentTarget.classList.toggle('pictures__like_black');
}

function makeLike(item) {
  item.addEventListener('click', likeClickHandler);
}

function selectAllLikes() {
  document.querySelectorAll('.pictures__like').forEach(makeLike);
}

selectAllLikes();

// Удаление карточки

function deleteCard(event) {
  console.log(event.target.parentElement)
  event.target.parentElement.remove();
  
}

function makeDelete(item) {
  item.addEventListener('click', deleteCard);
  console.log('fff')
}

function selectDeleteButtons() {
  document.querySelectorAll('.pictures__img-delete').forEach(makeDelete);
}

selectDeleteButtons();