const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const bidSchema = require('./Bids');
const commentSchema = require('./Comments');
const User = require ('./User');

const jobSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            // validate: {
            //     minlength: 1,
            //     maxlength: 200
            // }
        },
        bids: [bidSchema],
        postedBy: {
            type: Schema.Types.String,
            ref: 'user'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        comments: [commentSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    },


)

// virtual to get the bid count for a job
jobSchema.virtual('bidCount').get(function () {
    return this.bids.length;
})

const Jobs = model('Jobs', jobSchema);

module.exports = Jobs;