import React, { Component } from "react";
import axios from "axios";

import UpdateAccount from "../forms/update-account";

export default class AccountInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      permission: ""
    };

    this.handleSuccessfulUpdate=this.handleSuccessfulUpdate.bind(this)
  }


  handleSuccessfulUpdate() {
    console.log('update successful')
    this.getAccountInfo();
  }

  getAccountInfo() {
    axios
      .get("http://localhost:5000/get-account-info", {
        withCredentials: true
      })
      .then(response => {
        if (response.data != "AUTH_FAILED") {
          this.setState({
            email: response.data[0].user_email,
            username: response.data[0].user_username,
            permission: response.data[0].user_permission
          });
        }
      })
      .catch(error => {
        console.log("get account info error", error);
      });
  }

  componentWillMount() {
    this.getAccountInfo();
  }

  render() {
    return (
      <div>
        <div>{this.state.username}</div>
        <div>{this.state.email}</div>
        <UpdateAccount handleSuccessfulUpdate={this.handleSuccessfulUpdate}/>
        <div>admin panel</div>
      </div>
    );
  }
}
