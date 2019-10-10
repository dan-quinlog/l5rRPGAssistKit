import React, { Component } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const NavBar = props => {
  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  };

  return (
    <div className="nav-wrapper">
      <div className="nav-link-wrapper">
        <NavLink exact to="/" activeClassName="nav-link-active">
          Home
        </NavLink>
      </div>
      {props.loggedIn === "LOGGED_IN"
        ? dynamicLink("/character-creation", "Character Creation")
        : null}
      {props.loggedIn === "LOGGED_IN"
        ? dynamicLink("/campaign-creation", "Campaign Creation")
        : null}
      {props.loggedIn === "LOGGED_IN"
        ? dynamicLink("/campaign-search", "Campaign Search")
        : null}
      <div className="nav-link-wrapper">
        <NavLink exact to="/die-statistics" activeClassName="nav-link-active">
          Die Statistics
        </NavLink>
      </div>
      <div className="nav-link-wrapper">
        <NavLink exact to="/forum" activeClassName="nav-link-active">
          Forum
        </NavLink>
      </div>
      <div className="nav-link-wrapper">
        <NavLink exact to="/about" activeClassName="nav-link-active">
          About
        </NavLink>
      </div>
      <div className="nav-link-wrapper">
        <NavLink exact to="/login" activeClassName="nav-link-active">
          Logout/Account Settings
        </NavLink>
      </div>
    </div>
  );
};

export default withRouter(NavBar);
