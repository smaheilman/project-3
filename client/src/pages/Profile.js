import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { getLoggedUser } from '../utils/API';
import { application } from 'express';

const Profile = (props) => {

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
  
          const response = await getMe(token);
  
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
  
    // create function that accepts the book's mongo _id value as param and deletes the book from the database
    const handleDeleteJob = async (jobId) => {
      const token = Auth.loggedIn() ? Auth.getToken() : null;
  
      if (!token) {
        return false;
      }
  
      try {
        const response = await deleteJob(jobId, token);
  
        if (!response.ok) {
          throw new Error('something went wrong!');
        }
  
        const updatedUser = await response.json();
        setUserData(updatedUser);
        // upon success, remove book's id from localStorage
        removeJobId(JobId);
      } catch (err) {
        console.error(err);
      }
    };
  
    // if data isn't here yet, say so
    if (!userDataLength) {
      return <h2>LOADING...</h2>;
    }
  

    return (
        <div>
            <div className="flex-row mb-3">
                <h2 className="bg-dark text-secondary p-3 display-inline-block">
                    Viewing {userParam ? `${user.username}'s` : 'your'} profile.
                </h2>
            </div>
        </div>
    );
};

export default Profile;