import React, { useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { getLoggedUser } from '../utils/API';

const Profile = (props) => {

    const { username: userParam } = useParams();

    useEffect (() => {
        handleGetUserProfile();},
        []);

    // redirect to personal profile page if username is yours
    if (Auth.loggedIn() && Auth.user().data.username === userParam) {
        return <Redirect to="/profile" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
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