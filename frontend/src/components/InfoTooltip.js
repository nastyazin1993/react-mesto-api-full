import React from "react";
import PopupWithForm from "./PopupWithForm";

function InfoTooltip({
  isOpen,
  loggedIn,
  onClose,
  codeStatusInfo,
  infoTooltip,
}) {
  return (
    <PopupWithForm
      name={"info-tooltip"}
      isOpen={isOpen}
      onClose={onClose}
      loggedIn={loggedIn}
      infoTooltip={infoTooltip}
    >
      <img
        src={codeStatusInfo.iconStatus}
        alt="Иконка с ответом сервера"
        className="form__icon"
      />

      <p className="popup__title">{codeStatusInfo.text}</p>
    </PopupWithForm>
  );
}

export default InfoTooltip;
