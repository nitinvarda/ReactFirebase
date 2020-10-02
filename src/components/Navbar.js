import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase'
const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setIsAuthenticated(true)
            }

        })
    }, [isAuthenticated])
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light ">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand" to="/">Todo's</Link>

            <div className="collapse navbar-collapse " id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0 ">
                    {isAuthenticated ? (<li></li>) : (<React.Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" to="/signup" >Signup</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Login" >Login</Link>
                        </li>

                    </React.Fragment>)}

                </ul>

            </div>
        </nav>
    );
}

export default Navbar;
