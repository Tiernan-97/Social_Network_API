const { Thought, User } = require("../models");

module.exports = {
  // Get all Thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a Thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({
        _id: req.params.ThoughtId,
      }).select("-__v");

      if (!thought) {
        return res.status(404).json({ message: "No Thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a Thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      User.findOneAndUpdate(
        { _id: req.body.UserId },
        { $addtoset: { thoughts: thought._id } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a Thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.ThoughtId,
      });

      const userData = User.findOneAndUpdate(
        {thoughts: req.params.thoughtID},
        {$pull: {thoughts: req.params.thoughtId}},
        {new: true});

      if (!thought) {
        res.status(404).json({ message: "No Thought with that ID" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a Thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.ThoughtId },
        { $set: req.body },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No Thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const reaction = Reaction.create(req.body);

      Thought.findOneAndUpdate(
        { _id: req.body.ThoughtId },
        { $addtoset: { reactions: req.body.ReactionId } },
        { new: true }
      );
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteReaction(req, res) {
    try {
      const reaction = Reaction.findOneAndDelete(req.params.reactionID);
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
