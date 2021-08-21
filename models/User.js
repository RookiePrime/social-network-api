const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: 'A user must have a username!',
            trim: true
        },
        email: {
            type: String,
            required: 'A user must have a unique, valid email address!',
            unique: true,
            validator: {
                validator: function(email) {
                    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(email);
                },
                message: email => `${email.value} is not a valid email address!`
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// This gets the number of friends someone has! A very commonly-sought number for the socials
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length || 'No friends detected; go make friends!';
});

const User = model('User', UserSchema);

module.exports = User;