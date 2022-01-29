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
        // job array referencing the job model
        postedJobs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Job'
            }
        ],
        savedJobs: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Job'
            }
        ]
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
// virtual to get the total count of jobs a user has posted
userSchema.virtual('postedJobCount').get(function() {
    return this.postedJobs.length;
})
// virtual to get the number of jobs a user has saved, or bid, on
userSchema.virtual('savedJobCount').get(function() {
    return this.savedJobs.length;
})

const User = model('User', userSchema);

module.exports = User;