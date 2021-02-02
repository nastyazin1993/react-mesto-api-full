import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card({ onCardClick, card, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = (card.owner._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `${isOwn ? 'element__delete' : 'element__delete_hidden'}`
  );

  const isLiked = card.likes.some((item) => item._id === currentUser._id);
  
  const cardLikeButtonClassName = (
    `${isLiked ? 'element__heart_active' : 'element__heart'}`
  );
    function handleClick() {
        onCardClick(card);
      }
      function handleDeleteClick() {
        onCardDelete(card);
      }
      function handleLikeClick() {
        onCardLike(card);
      }

  return (
    
          <div className="element">
            <button type="button" className={`element__delete ${cardDeleteButtonClassName}`} onClick={handleDeleteClick}></button>
            <img className="element__img" src={card.link} alt={card.name} onClick={handleClick}/>
            <div className="element__info">
                <h2 className="element__title">{card.name}</h2>
                <div>
                <button type="button" className={`element__heart ${cardLikeButtonClassName}`} onClick={handleLikeClick}></button>
                <p className="element__sumLike">{card.likes.length}</p>
              </div>
            </div>
          </div>
        
  );
 
}
  
export default Card;