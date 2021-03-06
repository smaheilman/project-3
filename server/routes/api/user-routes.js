const router = require('express').Router();
const {
  createUser,
  getMe,
  login,
  getSingleUser,
  getAllUsers,
  saveJob
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

router.route('/')
    .get(getAllUsers)

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveJob);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getMe);

router.route('/:userId').get(getSingleUser);

module.exports = router;