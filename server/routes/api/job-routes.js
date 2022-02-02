const router = require("express").Router();
const {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  addComment,
  removeComment,
  updateComment,
  addBid,
  removeBid,
} = require("../../controllers/job-controller");

router.route("/").get(getAllJobs);

router.route("/:userId").post(createJob);

router.route("/:jobId").get(getJobById).put(addComment).put(updateJob).delete(deleteJob).post(addBid);;

router.route("/:jobId/bids")

router.route("/:jobId/:commentId").put(updateComment).delete(removeComment);

router.route("/:jobId/bids/:bidId").delete(removeBid);

module.exports = router;
