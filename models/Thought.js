const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'A reaction must have text!',
            maxLength: [280, "It can't have more than 280 characters!"]
        },
        username: {
            type: String,
            required: 'Someone has to be attributed to this reaction!'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    }
);

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: 'A thought must have text!',
            minLength: [1, 'It needs at least a charater!'],
            maxLength: [280, "It can't have more than 280 characters!"]
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: 'Someone has to be attributed to this thought!'
        },
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length || 'No reactions found!';
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;