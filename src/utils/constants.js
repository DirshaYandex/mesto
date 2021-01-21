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
    buttonInvalidClass: 'popup__save_state_invalid',
    errorSelector: '.error'
};

const userInfoConfig = {
    profileNameSelector: '.profile__name',
    profileProfessionSelector: '.profile__profession',
    profileImageSelector: '.profile__img'
}

const pictureSectionSelector = '.pictures';
const picturePopupSelector = '.picture-popup';
const addPopupSelector = '.add-popup';
const editPopupSelector = '.edit-popup';
const confirmDeletePopupSelector = '.alert-popup';
const updatePopupSelector = '.update-popup';
const pictureTemplateSelector = '#pictures';

export { userInfoConfig,validationConfig,initialCards,pictureSectionSelector,picturePopupSelector,addPopupSelector,editPopupSelector,confirmDeletePopupSelector,pictureTemplateSelector,updatePopupSelector  }