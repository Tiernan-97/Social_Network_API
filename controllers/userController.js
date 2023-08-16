const { ObjectId } = require('mongoose').Types;
const { User, Course } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await user.find();

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await user.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({user});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await user.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await user.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      res.json({ message: 'user successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an assignment to a user
  async updateUser(req, res) {
    try {
      const user = await user.findOneAndUpdate(
        { _id: req.params.userId },
        { username: req.body.username },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addNewFriend(req, res) {
    try {
      const user = await user.findOneAndUpdate(
        { _id: req.params.userId },
        { $addtoset: {friends: req.body.friendId} },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID' });
      };

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeAFriend(req, res) {
    try {
      const user = await user.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: {friends: req.body.friendId} },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID' });
      };

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },



};
