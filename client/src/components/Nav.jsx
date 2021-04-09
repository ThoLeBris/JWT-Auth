import React from "react";
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../UserContext'

function Nav() {

    const {user} = useContext(UserContext);
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">JWT-AUTH</Link>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">

                    {!user ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item">
                            <Link className="nav-link" to="/user">User</Link>
                        </li>
                    )}
                    
                </ul>
            </div>
        </nav>
    )
}

export default Nav;