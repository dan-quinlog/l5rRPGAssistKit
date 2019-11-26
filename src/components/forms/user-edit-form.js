import React, { Component } from "react";
import axios from "axios";

export default class UserEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.user_id,
      username: this.props.username,
      email: this.props.email,
      permission: this.props.permission
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildForm = this.buildForm.bind(this);
  }

  buildForm() {
    let formData = new FormData();

    formData.append("user_id", this.state.user_id);
    formData.append("user_username", this.state.username);
    formData.append("user_email", this.state.email);
    formData.append("user_permission", this.state.permission);

    return formData;
  }

  handleSubmit(event) {
    axios
      .post("http://localhost:5000/edit-user", this.buildForm(), {
        withCredentials: true
      })
      .then(response => {
        if (response.data === "USER_UPDATED") {
          this.props.handleSuccessfulSubmit();
        } else {
          console.log("user update error", response.data);
        }
      })
      .catch(error => {
        console.log("edit user error", error);
      });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>User ID</div>
        <div>{this.state.user_id}</div>
        <div>Username</div>
        <input
          onChange={this.handleChange}
          name="username"
          type="text"
          placeholder="username"
          value={this.state.username}
        />
        <div>Email</div>
        <input
          onChange={this.handleChange}
          name="email"
          type="text"
          placeholder="user email"
          value={this.state.email}
        />
        <div>Permissions</div>
        <input
          onChange={this.handleChange}
          name="permission"
          type="text"
          placeholder="user permission"
          value={this.state.permission}
        />

        <button>Save</button>
      </form>
    );
  }
}
