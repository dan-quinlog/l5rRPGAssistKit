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
    this.toolKitDropdown_off = this.toolKitDropdown_off.bind(this);
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
  toolKitDropdown_off() {
    this.setState({ viewToolkit: false });
  }

  render() {
    return (
      <div className="nav-wrapper">
        {this.props.loggedIn === "LOGGED_IN" ? (
          <div className="nav-link-wrapper">
            <NavLink exact to="/" activeClassName="nav-link-active">
              Play
            </NavLink>
          </div>
        ) : (
          <div className="nav-link-wrapper">
            <NavLink exact to="/" activeClassName="nav-link-active">
              Home
            </NavLink>
          </div>
        )}
        <div className="nav-link-wrapper">
          <NavLink exact to="/forum" activeClassName="nav-link-active">
            Discord
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
              <NavLink
                to="/campaign-management"
                onClick={this.toolKitDropdown_off}
              >
                Campaign Management
              </NavLink>
              <NavLink
                to="/character-management"
                onClick={this.toolKitDropdown_off}
              >
                Character Management
              </NavLink>
              <NavLink to="/campaign-search" onClick={this.toolKitDropdown_off}>
                Search Campaigns
              </NavLink>
              <NavLink
                to="/die-statistics-page"
                onClick={this.toolKitDropdown_off}
              >
                Die Statistics
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="nav-link-wrapper">
            <NavLink
              exact
              to="/die-statistics-page"
              activeClassName="nav-link-active"
            >
              Die Statistics
            </NavLink>
          </div>
        )}
        <div className="nav-link-wrapper">
          <NavLink exact to="/about" activeClassName="nav-link-active">
            About
          </NavLink>
        </div>
        {this.props.loggedIn === "LOGGED_IN" ? (
          <div className="nav-link-wrapper">
            <NavLink
              exact
              to="/account-information"
              activeClassName="nav-link-active"
            >
              Account Information
            </NavLink>
            <NavLink exact to="/logout" activeClassName="nav-link-active">
              Logout
            </NavLink>
          </div>
        ) : (
          <div className="nav-link-wrapper">
            <NavLink exact to="/sign-up" activeClassName="nav-link-active">
              Sign Up
            </NavLink>
            <NavLink exact to="/login" activeClassName="nav-link-active">
              Login
            </NavLink>
          </div>
        )}
      </div>
    );
  }
}
