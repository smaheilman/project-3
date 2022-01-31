import React, {useState} from 'react';
import Nav from './Nav/index';
import Home from '../pages/Home';
import LoginForm from '../pages/Login';
import SignupForm from '../pages/Signup';
import Dashboard from '../pages/Dashboard'
import Auth from '../utils/auth';

function Portfolio() {
    // Using useState, set the default value for currentPage to 'Home'
    const [currentPage, handlePageChange] = useState('Home');
  
    // The renderPage method uses a switch statement to render the appropriate current page
    const renderPage = () => {
      switch (currentPage) {
        case 'Home':
          return <Home />;
        case 'Login':
          return <LoginForm/>;
        case 'Signup':
          return <SignupForm />;
        case 'Dashboard':
            return <Dashboard />;
        default:
          return <Home />;
      }
      
    };

    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };
    
  
    return (
      <div>
        {/* Pass the state value and the setter as props to NavTabs */}
        <Nav currentPage={currentPage} handlePageChange={handlePageChange} />
        {/* Call the renderPage function passing in the currentPage */}
        {Auth.loggedIn() ? (
            <>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
                <div>{renderPage(currentPage)}</div>
            </>
          )}

      </div>
    );
  }
  
  export default Portfolio;