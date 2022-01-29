const router = require('express').Router();
const {getAllJobs, 
    getJobById, 
    createJob, 
    updateJob, 
    deleteJob, 
    addComment, 
    removeComment, 
    updateComment, 
    addBid, 
    removeBid} = require('../../controllers/job-controller');
    
router.route('/')
    .get(getAllJobs)

router.route('/:userId')
    .post(createJob)
    .get(getJobById)


router
    .route('/:jobId')
    .put(addComment)
    .put(updateJob)
    .delete(deleteJob)
    .put(addBid)

router 
    .route('/:jobId/:commentId')
    .put(updateComment)
    .delete(removeComment)

router
    .route('/:jobId/:bidId')
    .delete(removeBid)

router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports =router;