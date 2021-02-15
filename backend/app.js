require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const path = require('path');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { validateUser } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();
const hosts = [
  'http://localhost:3001',
  'http://localhost:3000',
  'nastyagun1993.students.nomoredomains.work',
  'api.nastyagun1993.students.nomoredomains.work',
  'www.nastyagun1993.students.nomoredomains.work',
  'www.api.nastyagun1993.students.nomoredomains.work',
];

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

/* app.use((req, res, next) => {
  req.user = {
    _id: '5fccc570fe90523760e526bc',
  };
  next();
}); */

app.use(cors({ origin: hosts }));

app.use(auth);
app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardsRouter);

app.use('*', (res, req, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ message: err.status === 500 ? 'Ошибка сервера' : err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
