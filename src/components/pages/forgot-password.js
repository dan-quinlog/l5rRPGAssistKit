import React, { Component } from "react";
import axios from "axios";

export default class ForgotPassword extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      user_id: "",
      recovery_question: "",
      recovery_answer: "",
      newpass: "",
      confirmpass: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.getRecoveryQuestion = this.getRecoveryQuestion.bind(this);
    this.sendRecoveryInfo = this.sendRecoveryInfo.bind(this);
  }

  getRecoveryQuestion() {
    event.preventDefault();
    axios
      .get(
        `http://localhost:5000/get-recovery-question?email=${this.state.email}`
      )
      .then(response => {
        if (response.data !== "USER_NOT_FOUND") {
          this.setState({
            user_id: response.data[0].user_id,
            recovery_question: response.data[0].user_recovery_question
          });
        } else {
          console.log("get recovery question failed", response.data);
        }
      })
      .catch(error => {
        console.log("get recovery question error", error);
      });
  }

  sendRecoveryInfo() {}

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <div>
          to recover your password we'll need you to answer your security
          question you set when you created your account.
        </div>
        {this.state.user_id == "" || this.state.recovery_question == "" ? (
          <form onSubmit={this.getRecoveryQuestion}>
            <input
              type="text"
              name="email"
              placeholder="Enter your Email"
              onChange={this.handleChange}
              value={this.state.email}
            />
            <button type="submit">Get recovery question</button>
          </form>
        ) : (
          <form onSubmit={this.sendRecoveryInfo}>
            <div>{this.state.recovery_question}</div>
            <input
              type="text"
              name="recovery_answer"
              placeholder="Your Answer"
              onChange={this.handleChange}
              value={this.state.recovery_answer}
            />
            <input
              type="password"
              name="newpass"
              placeholder="Enter a new password"
              onChange={this.handleChange}
              value={this.state.newpass}
            />
            <input
              type="password"
              name="confirmpass"
              placeholder="Confirm new password"
              onChange={this.handleChange}
              value={this.state.confirmpass}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    );
  }
}
