//import { format } from "express/lib/response";
import React from "react";

import {BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {

  return (
    <Router>
      <Switch>
        <NavBar/>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
