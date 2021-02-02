import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext.js';


function EditProfilePopup({onClose, isOpen, onUpdateUser}) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]); 

    function handleChangeName(e) {
      setName(e.target.value);
    }

    function handleChangeDescription(e) {
      setDescription(e.target.value);
    }

    function handleSubmit(e) {
      e.preventDefault();
      onUpdateUser({
        name,
        about: description,
      });
    }

  return (
    <PopupWithForm
          name={'edit-profile'}
          title={'Редактировать профиль'}
          children={
            <>
              <label>
                <input
                  className="form__input form__name"
                  id="input-profileName"
                  name="name"
                  type="text"
                  placeholder="Имя"
                  required
                  minLength="2"
                  maxLength="40"
                  value={name || ''}
                  onChange={handleChangeName}
                />
                <span
                  className="form__input-error"
                  id="input-profileName-error"
                ></span>
              </label>
              <label>
                <input
                  className="form__input form__about-name"
                  id="input-profession"
                  name="about"
                  type="text"
                  placeholder="Профессия"
                  required
                  minLength="2"
                  maxLength="40"
                  value={description || ''} 
                  onChange={handleChangeDescription}
                />
                <span
                  className="form__input-error"
                  id="input-profession-error"
                ></span>
              </label>
            </>
          }
          text={'Сохранить'}
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        />
  );
}
  
export default EditProfilePopup;