import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, getLoggedUser, getJobs } from '../../utils/API';
import Auth from '../../utils/auth'
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

const JobList = (props) => {

  const [jobData, setJobData] = useState([]);

  // use this to determine if `useEffect()` hook needs to run again
  const jobDataLength = Object.keys(jobData).length;

  useEffect(() => {
    const getJobData = async () => {
      try {

        const response = await getJobs(jobData);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const job = await response.json();
        setJobData(job);
      } catch (err) {
        console.error(err);
      }
    };

    getJobData();
  }, [jobDataLength]);


  if (!jobDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Jobs!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {jobData.length
            ? `Viewing ${jobData.length} saved ${jobData.length === 1 ? 'job' : 'jobs'}:`
            : 'You have no Jobs!'}
        </h2>
        <CardColumns>
          {jobData.map((jobs) => {
            return (
              <Card key={jobs._id} border='dark'>
                <Card.Body>
                  <Card.Title>{jobs.title}</Card.Title>
                  <p className='small'>Description: {jobs.description}</p>
                  <p className='small'>Posted By: {jobs.username}</p>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default JobList;