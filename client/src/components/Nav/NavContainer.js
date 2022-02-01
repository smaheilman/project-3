import React, {useState} from 'react';
import Nav from './index';
import Home from '../../pages/Home';
import Landing from '../../components/Landing';
import LoginForm from '../../pages/Login';
import SignupForm from '../../pages/Signup';
import Dashboard from '../../pages/Dashboard'
import Auth from '../../utils/auth';

function Portfolio() {
    // Using useState, set the default value for currentPage to 'Home'
    const [currentPage, handlePageChange] = useState('Landing');
  
    // The renderPage method uses a switch statement to render the appropriate current page
    const renderPage = () => {
      switch (currentPage) {
        case 'Home':
          return <Landing />;
        case 'Login':
          return <LoginForm/>;
        case 'Signup':
          return <SignupForm />;
        case 'Dashboard':
            return <Dashboard />;
        default:
          return <Landing />;
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
        <div>{renderPage(currentPage)}</div>
        {Auth.loggedIn() ? (
            <>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
                
            </>
          )}

      </div>
    );
  }
  
  export default Portfolio;