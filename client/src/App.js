//import { format } from "express/lib/response";
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
//import Profile from "./pages/Profile";
import Home from './pages/Home';
import API from './utils/API';

function App() {

  const [user] = useState({Username: "user"});
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Router>
      <div>
        <Header />
        <div className="container">
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={Login} />
              {/* <Route exact path="/profile" component={Profile} /> */}
              <Route component={NoMatch} />
            </Switch>
          </div>
        <Footer />
      </div>
    </Router>

  )
}

export default App;
