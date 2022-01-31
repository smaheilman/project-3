import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, getLoggedUser } from '../../utils/API';
import Auth from '../../utils/auth'
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

const JobList = (props) => {

  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {

        const response = await getUsers(userData);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);


  if (!userDataLength) {
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
          {userData.postedJobs.length
            ? `Viewing ${userData.postedJobs.length} saved ${userData.postedJobs.length === 1 ? 'job' : 'jobs'}:`
            : 'You have no Jobs!'}
        </h2>
        <CardColumns>
          {userData.postedJobs.map((jobs) => {
            return (
              <Card key={jobs.jobId} border='dark'>
                <Card.Body>
                  <Card.Title>{jobs.title}</Card.Title>
                  <p className='small'>Description: {jobs.description}</p>
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