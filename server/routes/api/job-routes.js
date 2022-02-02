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

<<<<<<< HEAD
router.route('/:userId')
.post(createJob)
=======
router.route("/").get(getAllJobs);
>>>>>>> b10e935de5ef7b25bebb6a6ccb895c81f99bbe97

router.route("/:userId").post(createJob);

router.route("/:jobId").get(getJobById).put(addComment).put(updateJob).delete(deleteJob);

router.route("/:jobId/bids").post(addBid);

router.route("/:jobId/:commentId").put(updateComment).delete(removeComment);

router.route("/:jobId/bids/:bidId").delete(removeBid);

module.exports = router;
