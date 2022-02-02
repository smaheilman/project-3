import React, { useState, useEffect } from "react";
import {getJobs} from "./utils/API"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/Navbar/index";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import OneJob from "./components/OneJob";

function App() {

  return (
    <Router>
      <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path='/profile' component={Dashboard} />
          <Route exact path='/onejob/:jobId' component={OneJob}/>
        </Switch>
    </Router>
  );
}

export default App;
