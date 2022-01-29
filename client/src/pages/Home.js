import React from 'react';
import JobForm from '../components/JobForm';
//import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import JobList from '../components/JobListings';

const Home = () => {

    const loggedIn = Auth.loggedIn();

    return (
        <main>
            <h3>Home page</h3>
            <div className="flex-row justify-space-between">
                {loggedIn && (
                    <div className="col-12 mb-3">
                        <JobForm />
                    </div>
                )}
                <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
                    <JobList/>
                </div>
            </div>
        </main>
    );
};

export default Home;
