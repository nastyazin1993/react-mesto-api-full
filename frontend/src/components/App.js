import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import loading from "../images/loading-icon.gif";
import okIcon from "../images/ok-icon.svg";
import errIcon from "../images/error-icon.svg";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [codeStatusInfo, setCodeStatusInfo] = React.useState({
    iconStatus: loading,
    text: "Загрузка...",
  });

  // Проверить токен
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([res, data]) => {
        setCurrentUser(res);
        setCards(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setImagePopupOpen(false);
    setInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((item) =>
          item._id === card._id ? newCard : item
        );
        setCards(newCards);
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const newArrCards = cards.filter((element) => element !== card);
        setCards(newArrCards);
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateUser(res) {
    api
      .patchUserInfo(res)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateAvatar(link) {
    api
      .patchUserAvatar(link)
      .then((link) => {
        setCurrentUser(link);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  function handleAddPlaceSubmit(card) {
    api
      .postCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function cleanCodeStatusInfo() {
    setCodeStatusInfo({
      iconStatus: loading,
      text: "Загрузка...",
    });
  }

  function handleRegister(password, email) {
    cleanCodeStatusInfo();

    auth
      .register(escape(password), email)
      .then(() => {
        console.log("register ok");
        setCodeStatusInfo({
          iconStatus: okIcon,
          text: "Вы успешно зарегистрировались!",
        });
        history.push("/sign-in")
      })
      .catch((err) => {
        console.log(err);
        setCodeStatusInfo({
          iconStatus: errIcon,
          text: "Что-то пошло не так! Попробуйте еще раз.",
        });
      });
    setInfoTooltipOpen(true);
  }

  function handleLogin(password, email) {
    cleanCodeStatusInfo();

    auth
      .authorize(escape(password), email)
      .then((data) => {
        auth
          .getContent(data)
          .then((res) => {
            setEmail(res.data.email);
          })
          .catch((err) => console.log(err));
        setLoggedIn(true);
        history.push("/");
        setInfoTooltipOpen(false);
      })

      .catch((err) => {
        console.log(err);
        setCodeStatusInfo({
          iconStatus: errIcon,
          text: "Что-то пошло не так! Попробуйте еще раз.",
        });
      });
    setInfoTooltipOpen(true);
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setEmail("");
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="root">
          <div className="page">
            <Header email={email} loggedIn={loggedIn} signOut={handleSignOut} />
            <Switch>
              <Route path="/sign-up">
                <Register onRegister={handleRegister} />
              </Route>
              <Route path="/sign-in">
                <Login onLogin={handleLogin} />
              </Route>
              <ProtectedRoute
                path="/"
                component={Main}
                loggedIn={loggedIn}
                onEditAvatar={() => {
                  handleEditAvatarClick();
                }}
                onEditProfile={() => {
                  handleEditProfileClick();
                }}
                onAddPlace={() => {
                  handleAddPlaceClick();
                }}
                onCardClick={(card) => {
                  handleCardClick(card);
                }}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </Switch>
            <Footer />
          </div>
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            name={"open-image"}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            card={selectedCard}
          />
          <PopupWithForm
            name={"delete-card"}
            title={"Вы уверены?"}
            text={"Да"}
            /* isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}*/
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            loggedIn={loggedIn}
            codeStatusInfo={codeStatusInfo}
            infoTooltip={true}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
