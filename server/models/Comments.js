const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const commentSchema = new Schema(
    {
        commentBody: {
            type: String,
            required: true,
            // validate: {
            //     minlength: 1,
            //     maxlength: 200
            // }
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

module.exports = commentSchema;