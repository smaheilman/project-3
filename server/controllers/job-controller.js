const { Job, User } = require('../models');
const { db } = require('../models/User');

const jobController = {
        // create a Job
        createJob({ params, body }, res) {
            Job.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { postedJobs: _id } },
                    { new: true }
                )
            })
            .then(dbJobData => {
                if (!dbJobData) {
                    return res.status(404).json({ message: 'No Job found with this id' });
                }
                res.json(dbJobData);
            })
            .catch(err => {
                res.status(400).json(err)
            })
        },
        // update a job
        updateJob({ params, body }, res) {
            Job.findOneAndUpdate(
                { _id: params.jobId },
                body,
                { new: true, runValidators: true }
            )
            .then(dbJobData => {
                if (!dbJobData) {
                    return res.status(404).json({ message: 'No job found with this id' })
                }
                res.json(dbJobData);
            })
            .catch(err => res.json(err))
        },
        // get all jobs
        getJobs(req, res) {
            
        }
}

module.exports = jobController;