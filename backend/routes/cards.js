const router = require('express').Router();
const {
  getCards, createCard, deleteCard, addLikeCard, removeLikeCard,
} = require('../controllers/cards');
const { validateCard, validateId } = require('../middlewares/validation');

router.get('/', getCards);
router.delete('/:_id', validateId, deleteCard);
router.put('/:_id/likes', validateId, addLikeCard);
router.delete('/:_id/likes', validateId, removeLikeCard);
router.post('/', validateCard, createCard);

module.exports = router;
