const res = require("express/lib/response");
const { User, Jobs } = require("../models");
const { authMiddleware } = require("../utils/auth");

const jobController = {
  getAllJobs(req, res) {
    Jobs.find()
      .populate({
        path: "comments",
        path: "bids",
      })
      .sort({ createdAt: -1 })
      .then((dbJobData) => res.json(dbJobData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getJobById({ params }, res) {
    Jobs.findOne({ _id: params.jobId })
      .populate({
        path: "comments",
        path: "bids",
      })
      .populate("postedBy")
      .then((dbJobData) => {
        //if no Job found
        if (!dbJobData) {
          res.status(404).json({ message: "No job found with this id!" });
          return;
        }
        res.json(dbJobData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createJob({ params, body }, res) {
    Jobs.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate({ _id: params.userId }, { $push: { postedJobs: _id } }, { new: true });
      })
      .then((dbJobData) => {
        //  if (!dbJobData) {
        //      return res.status(404).json({ message: 'No Job found with this id' });
        //  }
        res.json(dbJobData);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },

  updateJob({ params, body }, res) {
    Jobs.findOneAndUpdate({ _id: params.jobId }, body, { new: true, runValidators: true })
      .then((dbJobData) => {
        if (!dbJobData) {
          res.status(404).json({ message: "No job found with this id!" });
          return;
        }
        res.json(dbJobData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //add bid
  addBid({ params, body }, res) {
    Jobs.findOneAndUpdate({ _id: params.jobId }, { $push: { bids: body } }, { new: true, runValidators: true })
      .then((dbJobData) => {
        if (!dbJobData) {
          res.status(404).json({ message: "No Job found with this id!" });
          return;
        }
        res.json(dbJobData);
      })
      .catch((err) => res.json(err));
  },

  //add comments
  addComment({ params, body }, res) {
    Jobs.findOneAndUpdate({ _id: params.jobId }, { $push: { comments: body } }, { new: true, runValidators: true })
      .then((dbJobData) => {
        if (!dbJobData) {
          res.status(404).json({ message: "No Job found with this id!" });
          return;
        }
        res.json(dbJobData);
      })
      .catch((err) => res.json(err));
  },

  updateComment({ params, body }, res) {
    Jobs.findOneAndUpdate({ _id: params.jobId }, { $push: { comments: body } }, { new: true, runValidators: true });
  },

  //check associations
  deleteJob({ params }, res) {
    Jobs.findOneAndDelete({ _id: params.jobId })
      .then((dbjobData) => {
        if (!dbjobData) {
          res.status(404).json({ message: "No job found with this id!" });
          return;
        }
        res.json(dbjobData);
      })
      .catch((err) => res.status(400).json(err));
  },

  removeComment({ params }, res) {
    Jobs.findOneAndUpdate({ _id: params.jobId }, { $pull: { comment: { commentId: params.commentId } } }, { new: true })
      .then((dbJobData) => res.json(dbJobData))
      .catch((err) => res.json(err));
  },

  updateComment({ params }, res) {
    Jobs.findOneAndUpdate({ _id: params.jobId }, { $pull: { comment: { commentId: params.commentId } } }, { new: true })
      .then((dbJobData) => res.json(dbJobData))
      .catch((err) => res.json(err));
  },

  removeBid({ params }, res) {
    Jobs.findOneAndUpdate({ _id: params.jobId }, { $pull: { bid: { bidId: params.bidId } } }, { new: true })
      .then((dbJobData) => res.json(dbJobData))
      .catch((err) => res.json(err));
  },
};

module.exports = jobController;
