import React from "react";
import "./Navbar.css"
import { NavLink } from "react-router-dom";

export const Navbar = ({
    name,
    token,
    role
}: {
    name: string,
    token: string,
    role: string
}
) => (
        <header className="main-navbar">
            <div className="main-navbar__container">
                <div className="main-navbar__item">
                    <NavLink exact to="/home">Home</NavLink>
                </div> {
                    !token &&
                    <div className="main-navbar__item">
                        <NavLink to="/auth">Auth</NavLink>
                    </div>}
                {
                    role === "Admin" &&
                    <React.Fragment>
                        <div className="main-navbar__item navbar__item__proffesores">
                            <NavLink to="/proffesores">Proffesores</NavLink>
                        </div>
                        <div className="main-navbar__item navbar__item__proffesores">
                            <NavLink to="/students">students</NavLink>
                        </div>
                    </React.Fragment>
                }

                {
                    token && role !== "Proffesor" &&
                    <div className="main-navbar__item navbar__item__courses">
                        <NavLink to="/courses">Courses</NavLink>
                    </div>
                }

                {
                    token &&
                    <React.Fragment>
                        {
                            role === "Admin" ?
                                <div className="main-navbar__item main-navbar__item__me">
                                    <NavLink to="/payments">payments</NavLink>
                                </div>
                                :
                                <div className="main-navbar__item  main-navbar__item__me">
                                    <NavLink to="/activity">activity</NavLink>
                                </div>
                        }

                        <div className='main-navbar__item navbar__my__profile__role__name'>
                            <NavLink to="/my-profile"><p ><b > {name}</b>{`  role (${role})`}</p></NavLink>
                        </div>
                    </React.Fragment>
                }

                {
                    token &&
                    <div className="main-navbar__item">
                        <NavLink to="/logout">Logout</NavLink>
                    </div>
                }

            </div> </header>)