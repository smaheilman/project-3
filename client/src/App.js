import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/Navbar/index";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import OneJob from "./components/OneJob";
import OneJob2 from "./components/OneJob2";

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
          <Route exact path='/onejob2/:jobId' component={OneJob2}/>
        </Switch>
    </Router>
  );
}

export default App;
