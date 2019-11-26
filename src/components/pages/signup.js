import React, { Component } from "react";
import axios from "axios";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
      confirmpass: "",
      recovery_question: "name",
      recovery_answer: ""
    };

    this.signup = this.signup.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
  }

  canSubmit() {
    if (
      this.state.email == "" ||
      this.state.username == "" ||
      this.state.password == "" ||
      this.state.password != this.state.confirmpass ||
      this.state.recovery_answer == ""
    ) {
      return false;
    } else {
      return true;
    }
  }

  signup() {
    event.preventDefault();
    if (this.canSubmit()) {
      axios
        .post("http://localhost:5000/signup", {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          recovery_question: this.state.recovery_question,
          recovery_answer: this.state.recovery_answer
        })
        .then(response => {
          if (response.data !== "SUCCESS") {
            console.log("signup error", response);
          } else {
            this.props.history.push("/login");
          }
        })
        .catch(error => {
          console.log("login error", error);
        });
    }
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
            required={true}
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

          <div className="signup-form__confirmpass signup-form__desc">
            <div className="signup-form__desc__title">Confirm: </div>
          </div>
          <input
            className="signup-form__confirmpass signup-form__input"
            type="password"
            name="confirmpass"
            placeholder=""
            onChange={this.handleChange}
            value={this.state.confirmpass}
          />

          <select
            className="signup-form__recovery-question signup-form__desc"
            onChange={this.handleChange}
            value={this.state.recovery_question}
            name="recovery_question"
          >
            <option value="What... is your name?">What... is your name?</option>
            <option value="What... is your quest?">What... is your quest?</option>
            <option value="What... is your favorite color?">
              What... is your favorite color?
            </option>
            <option value="What... is the capital of Assyria?">
              What... is the capital of Assyria?
            </option>
            <option value="What... is the air-speed velocity of an unladen swallow?">
              What... is the air-speed velocity of an unladen swallow?
            </option>
          </select>

          <div className="signup-form__recovery-answer signup-form__desc">
            <div className="signup-form__desc__title">Answer: </div>
          </div>
          <input
            className="signup-form__recovery-answer signup-form__input"
            type="text"
            name="recovery_answer"
            placeholder=""
            onChange={this.handleChange}
            value={this.state.recovery_answer}
          />
          {this.canSubmit() ? (
            <button className="button signup-form__submit" type="submit">
              Submit
            </button>
          ) : (
            <div className="button signup-form__submit">Complete Form</div>
          )}
        </form>
      </div>
    );
  }
}
