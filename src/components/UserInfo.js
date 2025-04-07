export default class UserInfo {
  constructor({ nameSelector, aboutSelector, photoSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatarPhoto = document.querySelector(photoSelector);
  }

  getUserInfo() {
    return { name: this._name.textContent, about: this._about.textContent };
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    if (avatar) {
      this._avatarPhoto.onload = () => {
        this._avatarPhoto.classList.remove("profile__photo_placeholder");
      };
      this._avatarPhoto.src = avatar;
    }
  }
}
