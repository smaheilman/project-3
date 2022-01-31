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
    .post(createJob)

//router.route('/:userId')
    

router
    .route('/:jobId')
    .get(getJobById)
    .put(addComment)
    .put(updateJob)
    .delete(deleteJob)
<<<<<<< HEAD
    .put(addBid)
    .get(getJobById)
=======

router
    .route('/:jobId/bids')
    .post(addBid)

>>>>>>> 265ff72a9c07d1991ba34746e882af22e9a34004

router 
    .route('/:jobId/:commentId')
    .put(updateComment)
    .delete(removeComment)

router
    .route('/:jobId/bids/:bidId')
    .delete(removeBid)

module.exports =router;