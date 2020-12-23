export default class UserInfo {
    constructor(profileFieldSelector, professionFieldSelector) {
        this._profileField = document.querySelector(profileFieldSelector);
        this._professionField = document.querySelector(professionFieldSelector);
        this._editPopupNameField = document.querySelector('.popup__field_type_name');
        this._editPopupProfessionField = document.querySelector('.popup__field_type_title');
    }

    getUserInfo () {
        this._editPopupNameField.value = this._profileField.textContent;
        this._editPopupProfessionField.value = this._professionField.textContent;
    }

    setUserInfo () {
        this._profileField.textContent = this._editPopupNameField.value;
        this._professionField.textContent = this._editPopupProfessionField.value;
    }
}