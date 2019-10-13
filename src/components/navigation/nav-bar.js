import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewToolkit: false
    };

    this.dynamicLink = this.dynamicLink.bind(this);
    this.toolKitDropdown = this.toolKitDropdown.bind(this);
  }

  dynamicLink(route, linkText) {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">
          {linkText}
        </NavLink>
      </div>
    );
  }

  toolKitDropdown() {
    this.state.viewToolkit
      ? this.setState({ viewToolkit: false })
      : this.setState({ viewToolkit: true });
  }

  render() {
    return (
      <div className="nav-wrapper">
        <div className="nav-link-wrapper">
          <NavLink exact to="/" activeClassName="nav-link-active">
            Home
          </NavLink>
        </div>
        {this.props.loggedIn === "LOGGED_IN" ? (
          <div className="tool-kit nav-link-wrapper">
            <a onClick={this.toolKitDropdown}>ToolKit</a>
            <div
              className={`tool-kit-dropdown ${
                this.state.viewToolkit ? "" : "hidden"
              }`}
            >
              <NavLink to="/campaign-management">Campaign Management</NavLink>
              <NavLink to="/character-management">Campaign Management</NavLink>
              <NavLink to="/campaign-search">Search Campaigns</NavLink>
              <NavLink to="/die-statistics">Die Statistics</NavLink>
            </div>
          </div>
        ) : (
          <div className="nav-link-wrapper">
            <NavLink
              exact
              to="/die-statistics"
              activeClassName="nav-link-active"
            >
              Die Statistics
            </NavLink>
          </div>
        )}
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
        {this.props.loggedIn === "LOGGED_IN" ? (
          <div className="nav-link-wrapper">
            <NavLink exact to="/login" activeClassName="nav-link-active">
              Account Settings
            </NavLink>
            <a onClick={this.props.handleLogOut}>Logout</a>
          </div>
        ) : (
          <div className="nav-link-wrapper">
            <NavLink exact to="/login" activeClassName="nav-link-active">
              Sign Up
            </NavLink>
            <a onClick={this.props.handleLogIn}>Login</a>
          </div>
        )}
      </div>
    );
  }
}
