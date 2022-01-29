const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const bidSchema = require('./Bids');

const jobSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            validate: {
                minlength: 1,
                maxlength: 200
            }
        },
        bids: [bidSchema],
        postedBy: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        createdAt: {
                type: Date,
                default: Date.now,
                get: (createdAtVal) => dateFormat(createdAtVal)
        },
        comments: [CommentSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    }
)

// virtual to get the bid count for a job
jobSchema.virtual('bidCount').get(function() {
    return this.bids.length;
})

const Job = model('Job', jobSchema);

module.exports = Job;