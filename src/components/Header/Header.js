import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    return (
        <div>
            <div className="header-image">
                <img src={logo} alt=""/>
            </div>
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage">Manage inventory here</Link>
                <button onClick={() => setLoggedInUser({})}>sign out</button>
            </nav>
        </div>
    );
};

export default Header;