import React, { useEffect, useState } from 'react';
//import { Redirect, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { getLoggedUser} from '../utils/API';
import JobForm from '../components/JobForm';
//import { application } from 'express';

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
    return <h2>You have no jobs yet</h2>;
  }


  return (
    <main>
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          {/* { Viewing {userParam ? `${user.username}'s` : 'your'} profile.} */}
        </h2>
        <JobForm/>
      </div>
    </div>
    </main>
  );
};

export default Dashboard;