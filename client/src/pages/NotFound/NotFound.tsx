import React from "react";
import { NavLink } from "react-router-dom";

import "./NotFound.css";
export const NotFound = () => (
  <div id="notfound">
    <div className="notfound">
      <div className="notfound-404">
        <div></div>
        <h1>404</h1>
      </div>
      <h2>Page not found</h2>
      <p>
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>
      <NavLink to="/home">home page</NavLink>
    </div>
  </div>
);
