import React, { useState } from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/Navbar/index";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <NavBar></NavBar>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path='/profile' component={Dashboard} />
        </Switch>
    </Router>
  );
}

export default App;
