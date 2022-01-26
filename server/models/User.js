const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// schema for creating the user model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address']
        },
        password: {
            type: String,
            required: true
        },
        // potentially more
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

// hash the user's password
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
})

userSchema.methods.isCorrectPassword = async function(password) {
    return bcrypt.compare(password, this.password)
}



const User = model('User', userSchema);

module.exports = User;