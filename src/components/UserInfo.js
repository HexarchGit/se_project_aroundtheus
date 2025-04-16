export default class UserInfo {
  constructor({ nameSelector, aboutSelector, photoSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatarPhoto = document.querySelector(photoSelector);
  }

  _showImage() {
    this._avatarPhoto.classList.add("profile__photo_state_loaded");
  }

  getUserInfo() {
    return { name: this._name.textContent, about: this._about.textContent };
  }

  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    if (avatar) {
      this._avatarPhoto.onload = () => this._showImage();
      this._avatarPhoto.onerror = () => this._showImage();
      this._avatarPhoto.src = avatar;
    }
  }
}
