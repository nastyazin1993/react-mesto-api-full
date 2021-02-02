import React from "react";

function PopupWithForm({
  name,
  title,
  children,
  text,
  isOpen,
  onClose,
  onSubmit,
  infoTooltip,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_open" : ""}`}>
      <div className="popup__container">
        <button
          type="reset"
          className="popup__close-button"
          value="Закрыть"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className="form"
          action="#"
          name={`${name}`}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          {!infoTooltip ? (
            <button
              type="submit"
              className="form__save-button form__save-button_action popup__button_type_confirm"
              value="Сохранить"
            >
              {text}
            </button>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
