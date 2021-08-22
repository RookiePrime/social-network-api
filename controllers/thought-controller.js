const { Thought, User } = require('../models');

const thoughtController = {
    // Get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
    },
    // Get a single thought by _id
    getOneThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err));
    },

    // Post a new thought (connected to a user's id)
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => {
                return User.findOneAndUpdate(
                    { username: dbThoughtData.username },
                    { $push: { thoughts: dbThoughtData._id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(400).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // Post a reaction to a thought
    createReaction({ body, params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete a reaction to a thought
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId } }},
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Update a thought by _id
    updateThought({ body, params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // Delete a thought by _id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                return User.findOneAndUpdate(
                    { username: dbThoughtData.username },
                    { $pull: { thoughts: dbThoughtData._id } },
                    { new: true, runValidators: true}
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
};

module.exports = thoughtController;