import React, { useState } from "react";

function Login({ onLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let { password, email } = data;

    onLogin(password, email);
  };

  return (
    <div className="form">
      <div className="form__container">
        <h2 className="form__title">Вход</h2>
        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="email"></label>
          <input
            id="email"
            name="email"
            type="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            className="form__input form__name form__name_theme_dark"
          />
          <label htmlFor="password"></label>
          <input
            id="password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Пароль"
            className="form__input form__name form__name_theme_dark"
          />
          <div className="form__button-container">
            <button
              type="submit"
              className="form__save-button form__save-button_theme_dark"
            >
              Войти
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
