import React, { Component } from "react";
import axios from "axios";

class Logout extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    event.preventDefault();
    axios
      .get("http://localhost:5000/logout", {
        withCredentials: true
      })
      .then(response => {
        this.props.handleSuccessfulLogout();
        this.props.history.push('/login');
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  componentDidMount() {
    this.handleLogout()
  }

  render() {
    return <div>Logging out...</div>;
  }
}

export default Logout;
