const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  User.find()
  /* .then((data) => res.send(data)) */
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      }
      res.send(data);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  console.log(req.user);
  const Id = mongoose.Types.ObjectId(req.params._id);
  // const { _id } = req.params;
  User.findById(Id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
      //  return;
      }
      res.send(user);
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  console.log(req.user);
  // const { _id } = req.user;
  const userId = mongoose.Types.ObjectId(req.user._id);
  User.findById(userId)
  // User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Нет пользователя с таким id');
        //  return;
      }
      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))

    .then((user) => {
      if (!user) {
        throw new BadRequestError('Переданы некорректные данные');
        //  return;
      } res.send({ data: user });
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Переданы некорректные данные');
        //  return;
      } res.send({ data: user });
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new BadRequestError('Переданы некорректные данные');
      //  return;
      } res.send({ data: user });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { password, email } = req.body;
  return User.findUserByCredentials(password, email)
    .then((user) => {
    // аутентификация успешна! пользователь в переменной user
    // создадим токен
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      // вернём токен
      res.send({ token, user });
    })
    .catch(/* (err) => { */ () => next(new UnauthorizedError('Введены неверное имя или пароль')));
  // ошибка аутентификации
  /* res
        .status(401)
        .send({ message: err.message });
    }); */
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateProfile,
  updateAvatar,
  login,
  getCurrentUser,
};
