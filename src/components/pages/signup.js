import React, { Component } from "react";
import axios from "axios";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: ""
    };

    this.signup = this.signup.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  signup() {
    event.preventDefault();
    axios
      .post("http://localhost:5000/signup", {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log("login response", response);
      })
      .catch(error => {
        console.log("login error", error);
      });
  }

  handleSignUp(email, username, password) {
    this.props.history.push("/account-information");
    this.props.handleSuccessfulLogin();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="signup-wrapper">
        <div className="signup-info signup-wrapper__left">
          <ul>
            <li>Use an email you can access to receive messages</li>
            <li>
              Create a password with at least a lowercase letter, uppercase
              letter, number, and symbol
            </li>
            <li>!!!!Do not reuse passwords across multiple sites!!!!</li>
          </ul>
        </div>
        <form
          className="signup-form signup-wrapper__right"
          onSubmit={this.signup}
        >
          <div className="signup-form__email signup-form__desc">
            <div className="signup-form__desc__title">Email: </div>
          </div>
          <input
            className="signup-form__email signup-form__input"
            type="email"
            name="email"
            placeholder=""
            onChange={this.handleChange}
            value={this.state.email}
          />

          <div className="signup-form__username signup-form__desc">
            <div className="signup-form__desc__title">UserName: </div>
          </div>
          <input
            className="signup-form__username signup-form__input"
            type="text"
            name="username"
            placeholder=""
            onChange={this.handleChange}
            value={this.state.username}
          />

          <div className="signup-form__password signup-form__desc">
            <div className="signup-form__desc__title">Password: </div>
          </div>
          <input
            className="signup-form__password signup-form__input"
            type="password"
            name="password"
            placeholder=""
            onChange={this.handleChange}
            value={this.state.password}
          />

          <button className="button signup-form__submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
