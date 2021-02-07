export const BASE_URL = "http://localhost:3001/";

export const register = (password, email) =>
  fetch(`${BASE_URL}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  }).then((res) => {
    console.log(res)
    if (res.ok) {
  
      return res.json();
    }
    
    return Promise.reject(new Error(`Ошибка: ${res.status} ....`));
  })


export const authorize = (password, email) =>
  fetch(`${BASE_URL}signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status} ....`));
    })
    .then((data) => {
      console.log(data)
      localStorage.setItem('jwt', data.token);
      
      return data;
  })
  .catch((err) => {
      console.log(err.message);
  })
   /* .then((data) => {
      console.log(data)
      if (data.token) {
        localStorage.setItem("jwt", data.token);

        return data.token;
      }
    });*/

export const getContent = (token) =>
  fetch(`${BASE_URL}users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status} ....`));
    })
    .then((data) => data);
