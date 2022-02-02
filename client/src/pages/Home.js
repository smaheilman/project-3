import React from "react";
import JobForm from "../components/JobForm";
//import { Link } from 'react-router-dom';
import Auth from "../utils/auth";
import JobList from "../components/JobListings";

const Home = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <JobList />
    </main>
  );
};

export default Home;
