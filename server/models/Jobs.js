const { Schema, model } = require('mongoose');

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
        bid: {
            type: Number
        },
        postedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
)

const Job = model('Job', jobSchema);

module.exports = Job;