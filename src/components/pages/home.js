import React, { Component } from "react";

export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.loggedIn === "LOGGED_IN") {
      return (
        <div className="home home-logged-in">
          <div className="heading-wrapper">
            Welcome to L5R RPG Assist Toolkit
          </div>
          <div className="body-wrapper">
            Here we will implement play area
          </div>
          <div className="home-footer-wrapper">Footer</div>
        </div>
      );
    } else {
      return (
        <div className="home home-logged-out">
          <div className="heading-wrapper">
            Welcome to L5R RPG Assist Toolkit
          </div>
          <div className="body-wrapper">
            Whether you are playing at a table with your friends, or running a
            campaign online, this toolkit should give you the features to make
            your gaming easier! Here you can develop and save your campaign
            data, including NPCs, characters, plot hooks, custom mechanics and
            session notes. Character management that helps with calculating
            experience spends and organizes equipment and opportunities for easy
            access during a session. Communication features to allow players and
            the GM to message each other globally or whispering. Die rolling is
            facilitated in the system, and tracked in the notes so you can
            always review what checks were pulled. Die statistics are also
            provided so you can see what your chances are for any given test!
          </div>
          <div className="home-footer-wrapper">Footer</div>
        </div>
      );
    }
  }
}
