export default class UserInfo {
    nameElement;
    aboutElement;
    _userId;
    constructor({ nameSelector, aboutSelector }) {
        this.nameElement = document.querySelector(nameSelector);
        this.aboutElement = document.querySelector(aboutSelector);
        this._userId = "";
    }
    getUserInfo() {
        return {
            name: this.nameElement.textContent || "",
            about: this.aboutElement.textContent || "",
        };
    }
    setUserInfo({ name, about }) {
        this.nameElement.textContent = name;
        this.aboutElement.textContent = about;
    }
    setUserId(id) {
        this._userId = id;
    }
    getUserId() {
        return this._userId;
    }
}
//# sourceMappingURL=UserInfo.js.map