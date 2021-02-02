import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Card from './Card';

function Main({ onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
          <section className="profile">
            <div className="profile__block">
              <div className="profile__avatar-conteiner" >
                <img
                  className="profile__avatar"
                  src={currentUser.avatar}
                  alt="аватар"
                />
                <div className="profile__avatar-overlay">
                  <img className="profile__avatar-icon" onClick={onEditAvatar} alt="icon"/>
                </div>
              </div>
              <div className="profile__info">
                <div className="profile__container-info">
                  <h1 className="profile__title">{currentUser.name}</h1>
                  <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
                </div>
                <p className="profile__subtitle">{currentUser.about}</p>
              </div>
            </div>
            <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
          </section>
          <section className="elements">
          
          {cards && cards.map((card) =>
            <Card 
              key={card._id} 
              card={card} 
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          )}
          
          </section>
        </main>
  );
 
}
  
export default Main;