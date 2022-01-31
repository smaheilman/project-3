const router = require('express').Router();
const {
  createUser,
  getMe,
  login,
  getSingleUser,
  getAllUsers
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware);

router.route('/all').get(getAllUsers);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getMe);

router.route('/:userId').get(getSingleUser);

module.exports = router;