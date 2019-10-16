import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavBar from "./navigation/nav-bar";
import Home from "./pages/home";
import CharacterCreation from "./pages/character-creation";
import CampaignCreation from "./pages/campaign-creation";
import CampaignSearch from "./pages/campaign-search";
import DieStats from "./pages/die-statistics-page";
import Forum from "./pages/forum";
import About from "./pages/about";
import Login from "./pages/login";
import NoMatch from "./pages/no-match";
import Icons from "../icons/icons";

export default class App extends Component {
  constructor(props) {
    super(props);
    
    Icons();

    this.state = {
      loggedIn: "LOGGED_OUT"
    };
    
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  handleLogIn() {
    this.setState({
      loggedIn: "LOGGED_IN"
    });
  }

  handleLogOut() {
    this.setState({
      loggedIn: "LOGGED_OUT"
    });
  }
  
  render() {
    return (
      <div className="app-container">
        <Router>
          <div className="app">
            <NavBar loggedIn={this.state.loggedIn} handleLogIn={this.handleLogIn} handleLogOut={this.handleLogOut}/>

            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Home {...props} loggedIn={this.state.loggedIn} />
                )}
              />
              <Route path="/character-management" component={CharacterCreation} />
              <Route path="/campaign-management" component={CampaignCreation} />
              <Route path="/campaign-search" component={CampaignSearch} />
              <Route path="/die-statistics-page" component={DieStats} />
              <Route path="/forum" component={Forum} />
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />

              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
