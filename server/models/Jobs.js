const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");
const bidSchema = require("./Bids");
const commentSchema = require("./Comments");

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
      username: { type: String, ref: "User" },
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

// jobSchema.pre('remove', async function() {
//   console.log('clearing job ID from savedJobs array in the user model')
//   await User.updateMany({ savedJobs: this._id }, { $pull: { savedJobs: this._id } }, { multi: true } )
// })

// jobSchema.pre('remove', function (next) {
//   mongoose.model("User").updateOne({ postedJobs: this._id }, { $pull: { postedJobs: this._id } })
//   .then(res => console.log(res))

//   return next();
// })

// virtual to get the bid count for a job
jobSchema.virtual("bidCount").get(function () {
  return this.bids.length;
});

const Job = model("Job", jobSchema);

module.exports = Job;
