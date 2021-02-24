
class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _getResponseData(res){
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status} ....`));
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      method: "GET",
     headers: {...this._headers,
     'authorization': `Bearer ${localStorage.getItem("jwt")}`},
    }).then(res => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: {...this._headers,
      'authorization': `Bearer ${localStorage.getItem("jwt")}`,},
    }).then(res => this._getResponseData(res));
  }

  deleteCard(url) {
    return fetch(`${this._url}cards/` + url, {
      method: "DELETE",
      headers: {
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
    }).then(res => this._getResponseData(res));
  }

  patchUserInfo(res) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      body: JSON.stringify(res)
    }).then(res => this._getResponseData(res));
  }

  postCard({ name, link }) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      body: JSON.stringify({
        name,
        link
      }),
    }).then(res => this._getResponseData(res));
  }

  getSumLikes() {
    return fetch(`${this._url}cards`, {
      method: "GET",
      headers: {
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
    }).then(res => this._getResponseData(res));
  }

  patchUserAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
      body: JSON.stringify(link)
    }).then(res => this._getResponseData(res));
  }

  changeLikeCardStatus(url, _id){
    return fetch(`${this._url}cards/` + url + '/likes', {
      method: (_id) ? 'PUT' : 'DELETE',
      headers: {
        ...this._headers,
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        },
    }).then(res => this._getResponseData(res));
  }

}

const api = new Api({
  url: "https://api.nastyagun1993.students.nomoredomains.work/",
  headers: {
    "Content-Type": "application/json",
    'authorization': `Bearer ${localStorage.getItem("jwt")}`,
  },
});

export default api;
