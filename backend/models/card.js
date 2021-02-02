const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/(((w{3}\.)?(\w+\.)+[a-zA-Z]{2,6})|((\d{1,3}\.){3}\d{1,3}))(:\d{2,5})?(\/[\w+-.?=]+)*#?$/.test(v);
      },
      message: (props) => `${props.value} ссылка не валидна`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',

  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    required: true,
    default: [],

  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,

  },

},
{ versionKey: false });
const cardModel = mongoose.model('card', cardSchema);

module.exports = cardModel;
