import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavBar from "./navigation/nav-bar";
import Home from "./pages/home";
import CharacterCreation from "./pages/character-creation";
import CampaignCreation from "./pages/campaign-creation";
import CharacterManagement from "./pages/character-management";
import CampaignManagement from "./pages/campaign-management";
import CharacterDetail from "./pages/character-detail";
import CampaignDetail from "./pages/campaign-detail";
import CampaignSearch from "./pages/campaign-search";
import DieStats from "./pages/die-statistics-page";
import Forum from "./pages/forum";
import About from "./pages/about";
import Login from "./pages/login";
import Logout from "./pages/logout";
import SignUp from "./pages/signup";
import AccountInformation from "./pages/account-information";
import NoMatch from "./pages/no-match";
import Icons from "../icons/icons";

export default class App extends Component {
  constructor(props) {
    super(props);

    Icons();

    this.state = {
      loggedIn: "LOGGED_OUT"
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedIn: "LOGGED_IN"
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedIn: "LOGGED_OUT"
    });
  }

  componentWillMount() {
    axios
      .get("http://localhost:5000/session", {
        withCredentials: true
      })
      .then(response => {
        // console.log("app mount response", response);
        if (response.data == "AUTH_SUCCESS") {
          this.handleSuccessfulLogin();
        } else if (response.data == "AUTH_FAILED") {
          this.handleSuccessfulLogout();
        }
      })
      .catch(error => {
        console.log("app mount error", error);
      });
  }

  render() {
    return (
      <div className="app-container">
        <Router>
          <div className="app">
            <NavBar
              loggedIn={this.state.loggedIn}
              handleLogOut={this.handleLogOut}
              handleLogIn={this.handleLogIn}
            />

            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Home {...props} loggedIn={this.state.loggedIn} />
                )}
              />
              <Route
                path="/character-management"
                component={CharacterManagement}
              />
              <Route path="/character-creation" component={CharacterCreation} />
              <Route path="/character/:slug" component={CharacterDetail} />
              <Route
                path="/campaign-management"
                component={CampaignManagement}
              />
              <Route path="/campaign-creation" component={CampaignCreation} />
              <Route path="/campaign/:slug" component={CampaignDetail} />
              <Route path="/campaign-search" component={CampaignSearch} />
              <Route path="/die-statistics-page" component={DieStats} />
              <Route path="/forum" component={Forum} />
              <Route path="/about" component={About} />
              <Route
                path="/sign-up"
                render={props => (
                  <SignUp
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                  />
                )}
              />
              <Route
                path="/account-information"
                component={AccountInformation}
              />
              <Route
                path="/login"
                render={props => (
                  <Login
                    {...props}
                    handleSuccessfulLogin={this.handleSuccessfulLogin}
                  />
                )}
              />
              <Route
                path="/logout"
                render={props => (
                  <Logout
                    {...props}
                    handleSuccessfulLogout={this.handleSuccessfulLogout}
                  />
                )}
              />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
