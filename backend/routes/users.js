const router = require('express').Router();
const {
  getUsers, getUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { validateUserUpdate, validateAvatar, validateId } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.get('/', getUsers);
router.get('/:_id', validateId, getUser);

// router.post('/', createUser);
router.patch('/me', validateUserUpdate, updateProfile);
router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
