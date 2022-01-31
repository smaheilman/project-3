import React from 'react';
import Home from '../../pages/Home'
import { Link, BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";

import { Typography } from '@mui/material';

const Header = () => {
  const location = useLocation();
  console.log(location);

  return (
    <header className="bg-secondary mb-4 py-2 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">

        <Link to={Home}>
          <Typography>
          Imperium
          </Typography>
        </Link>
      </div>
      <ul>
        <li>Test</li>
        <li></li>
      </ul>
    </header>
  );
};

export default Header;