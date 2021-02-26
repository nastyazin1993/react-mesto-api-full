const { celebrate, Joi, CelebrateError } = require('celebrate');
const { isURL } = require('validator');

const headers = Joi.object().keys({
  authorization: Joi.string().required(),
}).unknown(true);

const validateUser = celebrate({
  // headers,
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }).unknown(true),
});

const validateUserUpdate = celebrate({
  headers,
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(true),
});

const validateCard = celebrate({
  headers,
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректный URL');
      return value;
    }),
  }).unknown(true),
});

const validateId = celebrate({
  headers,
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }).unknown(true),
});

const validateAvatar = celebrate({
  headers,
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value) => {
      if (!isURL(value)) throw new CelebrateError('Некорректный URL');
      return value;
    }),
  }).unknown(true),
});

module.exports = {
  validateUser,
  validateUserUpdate,
  validateCard,
  validateId,
  validateAvatar,
};
