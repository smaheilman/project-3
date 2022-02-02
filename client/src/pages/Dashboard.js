import React, { useEffect, useState } from 'react';
//import { Redirect, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { getLoggedUser, getSingleJob} from '../utils/API';
import JobForm from '../components/JobForm';
import CompletedProjects from '../components/CompletedProjects';
//import { application } from 'express';
import {Container, CardColumns, Card} from 'react-bootstrap';
import { Link } from "react-router-dom";

const Dashboard = (props) => {

  const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getLoggedUser(token);

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

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>...Loading</h2>;
  }


  return (
    <main>
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Hello {userData.username}
        </h2>
        <JobForm/>
        <CompletedProjects/>
      </div>
      <Container>
        <h2>
          {userData.postedJobs.length
            ? `Viewing ${userData.postedJobs.length}  ${userData.postedJobs.length === 1 ? 'job' : 'jobs'}:`
            : 'You have no jobs!'}
        </h2>
        <CardColumns>
          {userData.postedJobs.map((job) => {
            //console.log(job._id);
            return (
              <Card key={job._Id} border='dark'>
                <Card.Body>
                  <Card.Title><Link to={`/onejob/${job._id}`}> Title: {job.title}</Link></Card.Title>
                  <Card.Text>Description: {job.description}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </div>
    </main>
  );
};

export default Dashboard;