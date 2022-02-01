import React from 'react';
import { Link } from 'react-router-dom';

const CompletedProjects = ({ username, savedJobs, savedJobCount }) => {
    if (!savedJobs || !savedJobs.length) {
        return <p>{username} has no jobs completed!</p>;
    }

    return (
        <main>
            <h4>
                {username}'s {savedJobCount} {savedJobCount === 1 ? 'job' : 'jobs'}
            </h4>
            {savedJobs.map(job => (
                <button key={job._id}>
                    <Link to={`api/jobs/${job._id}`}>{job.title}</Link>
                </button>
            ))}
        </main>
    )
}

export default CompletedProjects;