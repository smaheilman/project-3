import React from 'react';
//import { capitalizeFirstLetter } from '../../utils/helpers';

function Nav(props) {
    const tabs = ['Home', 'Login', 'Signup',  'Dashboard'];

    return (
        <div className='d-flex'>
            <nav className='container-fluid'>
            <ul className="navs nav-tab row">
                {tabs.map(tab => (
                    <li className="nav-item col mx-5" key={tab}>
                        <a
                            href={'#' + tab.toLowerCase()}
                            // Whenever a tab is clicked on,
                            // the current page is set through the handlePageChange props.
                            onClick={() => props.handlePageChange(tab)}
                            className= {
                                props.currentPage === tab ? 'nav-link active' : 'nav-link'
                            }
                        >
                            {tab}
                        </a>
                    </li>
                ))}
            </ul>
            </nav>
        </div>
    );
}

export default Nav;