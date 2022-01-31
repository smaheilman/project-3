//import { format } from "express/lib/response";
import React from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavContainer from "./components/NavContainer"

function App() {


  return (
    <Router>
      <div>
        <Header />
        <NavContainer/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
