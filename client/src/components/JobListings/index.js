import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJobs } from '../../utils/API';

const JobList = ({ jobs, title }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [jobs, setJobs] = useState([]);

  useEffect(() => 
  {
    fetch(getJobs)
    .then(res => res.json())
    .then(
      (result) => {
        setIsLoaded(true);
        setJobs(result);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    )
  }, [])
  
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div> Loading...</div>;
  }
  else if (!jobs.length) {
    return <h3>No Jobs Yet</h3>;
  } 

  return (
    <div>
      <h3>{title}</h3>
      {jobs &&
        jobs.map(jobs => (
          <div key={jobs._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${jobs.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {jobs.username}
              </Link>{' '}
              Job created on {jobs.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/job/${job._id}`}>
                <p>{jobs.jobText}</p>
                <p className="mb-0">
                  Bids: 
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default JobList;