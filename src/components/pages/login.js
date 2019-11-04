import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  login() {
    event.preventDefault();
    if (this.state.username != "" && this.state.password != "") {
      this.props.handleLogIn(this.state.username, this.state.password);
    } else {
      console.log(
        "login without fields",
        this.state.username,
        this.state.password
      );
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="login-wrapper">
        <div className="login-info login-wrapper__left">
          Don't have an account? <a>Click here to create one!</a>
        </div>
        <form className="login-form login-wrapper__right" onSubmit={this.login}>
          <div className="login-form__username login-form__desc">
            <div className="login-form__desc__title">UserName: </div>
          </div>
          <input
            className="login-form__username login-form__input"
            type="text"
            name="username"
            placeholder=""
            onChange={this.handleChange}
            value={this.state.username}
          />

          <div className="login-form__password login-form__desc">
            <div className="login-form__desc__title">Password: </div>
          </div>
          <input
            className="login-form__password login-form__input"
            type="password"
            name="password"
            placeholder=""
            onChange={this.handleChange}
            value={this.state.password}
          />
          <button className="button login-form__submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
