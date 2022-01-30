import React from 'react';
import { Link } from 'react-router-dom';

const CompletedProjects = ({ username, savedJobs, savedJobCount }) => {
    if (!savedJobs || !savedJobs.length) {
        return <p>{username} has no jobs completed!</p>;
    }

    return (
        <div>
            <h4>
                {username}'s {savedJobCount} {savedJobCount === 1 ? 'job' : 'jobs'}
            </h4>
            {savedJobs.map(job => (
                <button key={savedJobs._id}>
                    <Link to={`api/jobs/${savedJobs._id}`}>{savedJobs.title}</Link>
                </button>
            ))}
        </div>
    )
}

export default CompletedProjects;