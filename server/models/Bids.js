const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const bidSchema = new Schema(
    {
        // bidId: {
        //     type: Schema.Types.ObjectId,
        //     default: () => Types.ObjectId
        // },
        bidAmount: {
            type: Number,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
)

module.exports = bidSchema;
