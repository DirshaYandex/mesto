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

