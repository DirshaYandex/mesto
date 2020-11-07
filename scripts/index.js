const popup = document.querySelector('.popup');
const popupContent = document.querySelector('.popup__container');
const popupTitle = document.querySelector('.popup__text');

const popupCloseButton = document.querySelector('.popup__close');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

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

//Лайк

document.querySelectorAll('.pictures__like').forEach(item => {
  item.addEventListener('click', event => {
    event.currentTarget.classList.toggle('pictures__like_black');
  })
});