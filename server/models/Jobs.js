const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');
const dateFormat = require("../utils/dateFormat");
const bidSchema = require("./Bids");
const commentSchema = require("./Comments");
const User = require('./User');

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
      _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    },
    username: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    comments: [commentSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

jobSchema.pre('findOneAndDelete', function (next) {
  console.log(this._conditions._id)
  const ID = this._conditions._id;
  mongoose.model("User").updateMany({ savedJobs: ID }, { $pull: { savedJobs: ID } })
  .then(res => console.log("Id deleted"))
  return next();
})

jobSchema.pre('remove', function (next) {
  const ID = this._conditions._id;
  mongoose.model("User").updateOne({ postedJobs: ID }, { $pull: { postedJobs: ID } })
  .then(res => console.log(res))

  return next();
})

// virtual to get the bid count for a job
jobSchema.virtual("bidCount").get(function () {
  return this.bids.length;
});

const Job = model("Job", jobSchema);

module.exports = Job;
