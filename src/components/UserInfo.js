export default class UserInfo {
    constructor(userInfoCongig) {
        this._profileField = document.querySelector(userInfoCongig.profileNameSelector);
        this._professionField = document.querySelector(userInfoCongig.profileProfessionSelector);
        this._imageField = document.querySelector(userInfoCongig.profileImageSelector);
    }

    getUserInfo() {
        return {
            name: this._profileField.textContent,
            profession: this._professionField.textContent
        };
    }

    setUserInfo(inputValues) {
        this._profileField.textContent = inputValues[0];
        this._professionField.textContent = inputValues[1];
    }

    setUserImage(imageUrl) {
        this._imageField.src = imageUrl;
    }

    setUserId(user_id) {
        this._user_id = user_id
    }

    getUserId() {
        return this._user_id
    }
}