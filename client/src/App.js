//import { format } from "express/lib/response";
import React from "react";

import {BrowserRouter as Router, Route, Switch } from "react-router-dom";

import NavBar from "./components/Navbar";

function App() {

  return (
    <Router>
      <Switch>
        <NavBar/>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
