import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJobs, getLoggedUser } from '../../utils/API';
import Auth from '../../utils/auth'

const JobList = (props) => {

  const [jobData, setJobData] = useState([]);

  const jobDataLength = Object.keys(jobData).length;

  useEffect(() => {
    const getJobData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getLoggedUser(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const jobs = await response.json();
        setJobData(jobs);
      } catch (err) {
        console.error(err);
      }
    };
    getJobData();
  }, [jobDataLength]);

  if (!jobDataLength) {
    return <h2>No Jobs to display.</h2>;
  }


  return (
    <div>
      <h3>{getJobs.title}</h3>
      {jobData.title &&
        jobData.map(jobs => (
          <div key={jobs._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/profile/${jobs.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {jobs.username}
              </Link>{' '}
              Job created on {getJobs.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/job/${jobs._id}`}>
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