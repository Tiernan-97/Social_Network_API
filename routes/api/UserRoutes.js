const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friends/:friendId
router.route('/:userID/friends/:friendId').put(updateUser).delete(deleteUser);

module.exports = router;
