export default class Api {
  constructor({ url, token }) {
    this._apiurl = url;
    this._options = {
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    };
  }

  _genericFetch({ method = "GET", endpoint, body }) {
    const fetchOptions = { ...this._options, method };
    if (body) fetchOptions.body = JSON.stringify(body);
    return fetch(`${this._apiurl}/${endpoint}`, fetchOptions).then((result) => {
      if (result.ok) {
        return result.json();
      }
      return Promise.reject(`Error: ${result.status}`);
    });
  }

  getUser(endpoint = "users/me") {
    return this._genericFetch({ endpoint });
  }

  getCard(endpoint = "cards") {
    return this._genericFetch({ endpoint });
  }

  editUser(body, endpoint = "users/me") {
    return this._genericFetch({ method: "PATCH", endpoint, body });
  }

  editCard(method, endpoint) {
    return this._genericFetch({ method, endpoint });
  }

  addCard(body) {
    return this._genericFetch({ method: "POST", endpoint: "cards", body });
  }
}
