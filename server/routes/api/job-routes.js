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


router
    .route('/:jobId')
    .get(getJobById)
    .put(addComment)
    .put(updateJob)
    .delete(deleteJob)

router
    .route('/:jobId/bids')
    .post(addBid)


router 
    .route('/:jobId/:commentId')
    .put(updateComment)
    .delete(removeComment)

router
    .route('/:jobId/:bidId')
    .delete(removeBid)

module.exports =router;