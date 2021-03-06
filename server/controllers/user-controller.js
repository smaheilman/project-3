const { User } = require('../models');
const { update } = require('../models/User');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  getAllUsers(req, res) {
    User.find()
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
},

  // get a single user by either their id or their username
  async getMe({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    })
    .populate(
      {path: 'postedJobs',
      select: '-__v'}
    );

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  },
  // create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  // login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
  // {body} is destructured req.body
  async login({ body }, res) {
    const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = signToken(user);
    res.json({ token, user });
  },
  // find a user by their id
  async getSingleUser({ params }, res) {
    const user = await User.findOne({ _id: params.userId }).select('-__v');
    if (!user) {
      return res.status(400).json({ message: 'No user with this id' })
    }
    res.json(user);
  },
  async getAllUsers(req, res) {
    const users = await User.find({}).select('-__v');

    res.json(users);
  },
  // save a job to the savedJobs array in the User model
  async saveJob({ user, body }, res) {
    console.log(user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedJobs: body } },
        { new: true, runValidators: true }
      )
      return res.json(updatedUser)
    } catch(err) {
      console.log(err)
      return res.status(400).json(err)
    }
  }
};
