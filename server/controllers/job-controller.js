const res = require("express/lib/response");
const { User, Job } = require("../models");
const { authMiddleware } = require("../utils/auth");

const jobController = {
  getAllJobs(req, res) {
    Job.find()
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
    Job.findOne({ _id: params.jobId })
      .populate({
        path: "comments",
        path: "bids",
      })
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
    Job.create(body)
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
    Job.findOneAndUpdate({ _id: params.jobId }, body, { new: true, runValidators: true })
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
    Job.findOneAndUpdate({ _id: params.jobId }, { $push: { bids: body } }, { new: true, runValidators: true })
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
    Job.findOneAndUpdate({ _id: params.jobId }, { $push: { comments: body } }, { new: true, runValidators: true })
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
    Job.findOneAndUpdate({ _id: params.jobId }, { $push: { comments: body } }, { new: true, runValidators: true });
  },

  //check associations
  deleteJob({ params }, res) {
    Job.findOneAndDelete({ _id: params.jobId })
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
    Job.findOneAndUpdate({ _id: params.jobId }, { $pull: { comment: { commentId: params.commentId } } }, { new: true })
      .then((dbJobData) => res.json(dbJobData))
      .catch((err) => res.json(err));
  },

  updateComment({ params }, res) {
    Job.findOneAndUpdate({ _id: params.jobId }, { $pull: { comment: { commentId: params.commentId } } }, { new: true })
      .then((dbJobData) => res.json(dbJobData))
      .catch((err) => res.json(err));
  },

  removeBid({ params }, res) {
    Job.findOneAndUpdate({ _id: params.jobId }, { $pull: { bid: { bidId: params.bidId } } }, { new: true })
      .then((dbJobData) => res.json(dbJobData))
      .catch((err) => res.json(err));
  },
};

module.exports = jobController;
