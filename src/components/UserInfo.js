export {UserInfo}

class UserInfo {
    constructor(userNameSelector, userInfoSelector, userAvatarSelector) {
        this._userName = document.querySelector(userNameSelector);
        // console.log(this._userName);
        this._userInfo = document.querySelector(userInfoSelector);
        // console.log(this._userInfo);
        this._userAvatar = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        return {userName: this._userName.textContent, userInfo: this._userInfo.textContent, userAvatar: this._userAvatar}
    }

    setUserInfo(newName, newInfo) {
        this._userName.textContent = newName;
        this._userInfo.textContent = newInfo;
        // console.log(this._userInfo, this._userName)  
    }

    setUserAvatar(newAvatar) {
        this._userAvatar.src = newAvatar;
    }
}


// Класс необходим как геттер и сеттер для всех полей ввода

// В конструкторе обязательно указать объекты без метода textContent, в противном случае данные на странице не перезаписываются и в переменные попадает только строка, а не объект html