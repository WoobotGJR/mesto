export {UserInfo}

class UserInfo {
    constructor(userNameSelector, userInfoSelector) {
        this._userName = document.querySelector(userNameSelector);
        // console.log(this._userName);
        this._userInfo = document.querySelector(userInfoSelector);
        // console.log(this._userInfo);
    }

    getUserInfo() {
        return {userName: this._userName.textContent, userInfo: this._userInfo.textContent}
    }

    setUserInfo(newName, newInfo) {
        this._userName.textContent = newName;
        this._userInfo.textContent = newInfo;
        // console.log(this._userInfo, this._userName)  
    }
}


// Класс необходим как геттер и сеттер для всех полей ввода

// В конструкторе обязательно указать объекты без метода textContent, в противном случае данные на странице не перезаписываются и в переменные попадает только строка, а не объект html