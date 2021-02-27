const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isURL } = require('validator');

const headers = Joi.object().keys({
  authorization: Joi.string().required(),
}).unknown(true);

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректный URL');
      return value;
    }),
  }),
});

const validateUserUpdate = celebrate({
  headers,
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const validateCard = celebrate({
  headers,
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректный URL');
      return value;
    }),
  }),
});

const validateId = celebrate({
  headers,
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

const validateAvatar = celebrate({
  headers,
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректный URL');
      return value;
    }),
  }),
});

module.exports = {
  validateUser,
  validateUserUpdate,
  validateCard,
  validateId,
  validateAvatar,
  validateCreateUser,
};
