const router = require('express').Router();
const {
  getCards, createCard, deleteCard, addLikeCard, removeLikeCard,
} = require('../controllers/cards');
const { validateCard, validateId } = require('../middlewares/validation');

router.get('/', getCards);
router.post('/', validateCard, createCard);
router.delete('/:id', validateId, deleteCard);
router.put('/:id/likes', validateId, addLikeCard);
router.delete('/:id/likes', validateId, removeLikeCard);

module.exports = router;
