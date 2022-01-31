//import { format } from "express/lib/response";
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Landing from "./components/Landing";
import { Link, BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Header />
          <Landing />
          <Footer />
        </Route>
        <Route exact path="/">
          <Header />
          <Footer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
