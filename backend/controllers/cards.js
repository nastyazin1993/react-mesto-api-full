const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;
  Card.create({ name, link, owner: _id })
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Переданы некорректные данные');
      } res.send({ data: card });
    })
    .catch(next);
};
const getCards = (req, res, next) => {
  Card.find()
    .then((data) => {
      if (!data) {
        throw new NotFoundError('Запрашиваемый ресурс не найден');
      } res.send(data);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params._id)
    .then((card) => {
      if (!card) {
        throw new BadRequestError('Переданы некорректные данные');
      }
      res.send({ data: card });
    })
    .catch(next);
};

const addLikeCard = (req, res, next) => {
  const cardId = mongoose.Types.ObjectId(req.params._id);
  const userId = mongoose.Types.ObjectId(req.user._id);
  console.log(req.params);
  console.log(req.user);
  console.log(req.owner);
  Card.findByIdAndUpdate(
    // req.params._id,
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      res.send({ data: card });
    })
    .catch(next);
};

const removeLikeCard = (req, res, next) => {
  const cardId = mongoose.Types.ObjectId(req.params._id);
  const userId = mongoose.Types.ObjectId(req.user._id);
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      }
      res.send({ data: card });
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  removeLikeCard,
};
