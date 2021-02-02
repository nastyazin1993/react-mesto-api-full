import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onClose, isOpen, onAddPlace }) {
  const inputNameRef = React.useRef("");
  const inputLinkRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: inputNameRef.current.value,
      link: inputLinkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"add-card"}
      title={"Новое место"}
      children={
        <>
          <label>
            <input
              className="form__input form__name"
              id="input-AddCard"
              name="name"
              type="text"
              placeholder="Название"
              required
              minLength="1"
              maxLength="30"
              ref={inputNameRef}
            />
            <span className="form__input-error" id="input-AddCard-error"></span>
          </label>
          <label>
            <input
              className="form__input form__about-name"
              id="input-PlaceUrl"
              name="link"
              type="url"
              placeholder="Ссылка на картинку"
              required
              ref={inputLinkRef}
            />
            <span
              className="form__input-error"
              id="input-PlaceUrl-error"
            ></span>
          </label>
        </>
      }
      text={"Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default AddPlacePopup;
