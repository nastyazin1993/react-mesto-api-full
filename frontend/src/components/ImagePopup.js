import React from 'react';

function ImagePopup({name, isOpen, onClose, card }) {


  return (
    
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_open' : ''}`}>
          <div className="popup__container popup__container_open-image">
            <button
              type="reset"
              className="popup__close-button"
              value="Закрыть"
              onClick={onClose}
            ></button>
            <img className="popup__img" src={card.link} alt={card.name} />
            <h2 className="popup__title popup__title_open-image">{card.name}</h2>
          </div>
        </div>
  );
 
}
  
export default ImagePopup;