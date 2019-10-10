import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavBar from "./navigation/nav-bar";
import Home from "./pages/home";
import CharacterCreation from "./pages/character-creation";
import CampaignCreation from "./pages/campaign-creation";
import CampaignSearch from "./pages/campaign-search";
import DieStats from "./pages/die-statistics";
import Forum from "./pages/forum";
import About from "./pages/about";
import Login from "./pages/login";
import NoMatch from "./pages/no-match";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: "LOGGED_IN"
    };
    this.isLoggedIn = this.isLoggedIn.bind(this);
  }

  isLoggedIn() {
    return this.state.LoggedIn === "LOGGED_IN" ? true : false;
  }

  render() {
    return (
      <div className="app container">
        <Router>
          <div>
            <NavBar loggedIn={this.state.loggedIn} />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/character-creation" component={CharacterCreation} />
              <Route path="/campaign-creation" component={CampaignCreation} />
              <Route path="/campaign-search" component={CampaignSearch} />
              <Route path="/die-statistics" component={DieStats} />
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
