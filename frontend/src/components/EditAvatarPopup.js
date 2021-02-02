import React from 'react';
import PopupWithForm from './PopupWithForm';



function EditProfilePopup({onClose, isOpen, onUpdateAvatar}) {
    const inputRef = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  } 

  return (
    <PopupWithForm
          name={'edit-avatar'}
          title={'Обновить аватар'}
          children={
            <>
              <label>
                <input
                  className="form__input form__about-name"
                  id="input-AvatarUrl"
                  name="avatar"
                  type="url"
                  placeholder="Ссылка на картинку"
                  required
                  ref={inputRef}
                />
                <span className="form__input-error" id="input-AvatarUrl-error"></span>
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