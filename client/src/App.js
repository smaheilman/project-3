//import { format } from "express/lib/response";
import React from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import NoMatch from "./pages/NoMatch";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/signup" component={Signup} /> */}
          {/* <Route exact path="/profile" component={Profile} /> */}
          <Route component={NoMatch} />
        </Switch>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
