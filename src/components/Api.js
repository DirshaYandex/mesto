export default class Api {
    constructor(address, token, groupId, version) {
        this._address = address;
        this._token = token;
        this._groupId = groupId;
        this._version = version;
    }

    getUserInfo() {
        const url = `${this._address}/${this._version}/${this._groupId}/users/me`
        return this._fetch_request(url)
    }
    
    getCards() {
        const url = `${this._address}/${this._version}/${this._groupId}/cards`
        return this._fetch_request(url)
    }

    _fetch_request(url, method = 'GET') {
        return fetch(url, {
            method: method,
            headers: {
                authorization: this._token
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
    }

    setUserInfo(name, about) {
        const url = `${this._address}/${this._version}/${this._groupId}/users/me`
        return fetch(url, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
              about: about
            })
          })
          .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
    }

    createNewCard(item) {
        const url = `${this._address}/${this._version}/${this._groupId}/cards`
        return fetch(url, {
            method: 'POST',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: item.name,
              link: item.link
            })
          })
          .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
    }

    deleteCard(cardId) {
        const url = `${this._address}/${this._version}/${this._groupId}/cards/${cardId}`
        return fetch(url, {
            method: 'DELETE',
            headers: {
              authorization: this._token,
            }
          })
          .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
    }

    likeCard(cardId) {
        const url = `${this._address}/${this._version}/${this._groupId}/cards/likes/${cardId}`
        return fetch(url, {
            method: 'PUT',
            headers: {
              authorization: this._token,
            }
          })
          .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
    }

    deleteLikeCard(cardId) {
        const url = `${this._address}/${this._version}/${this._groupId}/cards/likes/${cardId}`
        return fetch(url, {
            method: 'DELETE',
            headers: {
              authorization: this._token,
            }
          })
          .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
    }

    changeImage(avatarUrl) {
        const url = `${this._address}/${this._version}/${this._groupId}/users/me/avatar`
        return fetch(url, {
            method: 'PATCH',
            headers: {
              authorization: this._token,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarUrl
              })
          })
          .then(response => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
    }

    
}
