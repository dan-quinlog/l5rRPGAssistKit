import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AlertModal from "../modals/alerts";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      alertModalIsOpen: false,
      alertModalText: ""
    };

    this.handeLogin = this.handeLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.setState({
      alertModalIsOpen: false
    });
  }

  handeLogin() {
    event.preventDefault();
    axios
      .post(
        "http://localhost:5000/login",
        {
          username: this.state.username,
          password: this.state.password
        },
        {
          withCredentials: true
        }
      )
      .then(response => {
        switch(response.data) {
          case 'AUTH_SUCCESS':
            this.props.handleSuccessfulLogin();
            this.props.history.push("/account-information");
            break;
          case 'USER_NOT_FOUND':
              this.setState({
                alertModalIsOpen: true,
                alertModalText:
                  "User Account not found"
              });
              setTimeout(() => {
                this.setState({
                  alertModalIsOpen: false
                });
              }, 1000);
              break;
          case 'AUTH_FAILED':
              this.setState({
                alertModalIsOpen: true,
                alertModalText:
                  "Authorization failed, check your credentials"
              });
              setTimeout(() => {
                this.setState({
                  alertModalIsOpen: false
                });
              }, 1000);
              break;
        }
        if (response.data == "AUTH_SUCCESS") {
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="login-wrapper">
        <AlertModal
          modalAction={"ALERT"}
          handleModalClose={this.handleModalClose}
          modalIsOpen={this.state.alertModalIsOpen}
          alertText={this.state.alertModalText}
        />
        <div className="login-info login-wrapper__left">
          <div className="login-info__text">Don't have an account?</div>{" "}
          <Link to="/sign-up" className="login-info__link">
            Create one now!
          </Link>
          <Link to='/forgot-password' className="login-info__link">
            Forgot password?
          </Link>
        </div>
        <form
          className="login-form login-wrapper__right"
          onSubmit={this.handeLogin}
        >
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
