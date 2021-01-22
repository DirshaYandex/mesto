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
const editFieldNameSelector = '.popup__field_type_name';
const editFieldProfessionSelector = '.popup__field_type_title';
const editPopupOpenButtonSelector = '.profile__edit-button';
const baseUrl = 'https://mesto.nomoreparties.co/v1/cohort-19';
const token = '1ab95744-b66b-4860-b7ff-75c4243c7033';
const addPopupOpenButtonSelector = '.profile__add-button';
const updatePopupOpenButtonSelector = '.profile__container';
const saveButtonText = 'Сохранить';
const saveButtonTextLoading = 'Сохранение...';

export { 
    userInfoConfig,validationConfig,pictureSectionSelector,picturePopupSelector,
    addPopupSelector,editPopupSelector,confirmDeletePopupSelector,pictureTemplateSelector,
    updatePopupSelector,editFieldNameSelector,editFieldProfessionSelector,editPopupOpenButtonSelector,
    baseUrl,token,addPopupOpenButtonSelector,updatePopupOpenButtonSelector,saveButtonText,saveButtonTextLoading
}