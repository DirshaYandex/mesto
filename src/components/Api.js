export default class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }

    getUserInfo() {
        return this._fetchRequest('users/me');
    }
    
    getCards() {
        return this._fetchRequest('cards');
    }

    setUserInfo(name, about) {
      const body = JSON.stringify({
        name: name,
        about: about
      });
      return this._fetchRequest('users/me', 'PATCH', body);
    }

    createNewCard(item) {
      const body = JSON.stringify({
        name: item.name,
        link: item.link
      });
      return this._fetchRequest('cards', 'POST', body);
    }

    deleteCard(cardId) {
      return this._fetchRequest(`cards/${cardId}`, 'DELETE');
    }

    likeCard(cardId) {
      return this._fetchRequest(`cards/likes/${cardId}`, 'PUT');
    }

    deleteLikeCard(cardId) {
      return this._fetchRequest(`cards/likes/${cardId}`, 'DELETE');
    }

    changeImage(avatarUrl) {
      const body = JSON.stringify({
        avatar: avatarUrl
      });
      return this._fetchRequest('users/me/avatar', 'PATCH', body);
    }

    _fetchRequest(postfix, method = 'GET', body = undefined) {
      const url = `${this._baseUrl}/${postfix}`
      let params = {
        method: method,
        headers: this._headers
      };
      if (body) {
        params.body = body
      }
      return fetch(url, params)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Ошибка ${response.status}`)
      })
    }
}
