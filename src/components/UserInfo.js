export default class UserInfo {
    constructor(userInfoCongig) {
        this._profileField = document.querySelector(userInfoCongig.profileNameSelector);
        this._professionField = document.querySelector(userInfoCongig.profileProfessionSelector);
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
}