const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-err');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  console.log(req.headers);
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, (NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'));
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация!');
  }
  req.user = payload;
  next();
};

module.exports = auth;
