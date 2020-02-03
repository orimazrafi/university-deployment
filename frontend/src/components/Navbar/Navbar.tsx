import React from "react";
import "./Navbar.css"
import { NavLink } from "react-router-dom";
export const Navbar = () => (
    <header className="main-navbar">
        <div className="main-navbar__container">
            <div className="main-navbar__item">
                <NavLink exact to="/home">Home</NavLink>
            </div>
            <div className="main-navbar__item">
                <NavLink to="/auth">Auth</NavLink>
            </div>
            <div className="main-navbar__item">
                <NavLink to="/courses">Courses</NavLink>
            </div>
        </div>
    </header>
)
