const router = require('express').Router();
const {
  getUsers, getUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { validateUserUpdate, validateAvatar, validateId } = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/:id', validateId, getUser);
// router.post('/', createUser);
router.patch('/me', validateUserUpdate, updateProfile);
router.patch('/me/avatar', validateAvatar, updateAvatar);
router.get('/me', getCurrentUser);

module.exports = router;
