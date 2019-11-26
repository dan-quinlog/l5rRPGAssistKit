import React, { Component } from "react";
import axios from "axios";

export default class UpdateAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      newpass: "",
      confirm: "",
      recovery_question: "",
      recovery_answer: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateAccount = this.handleUpdateAccount.bind(this);
    this.canSubmit = this.canSubmit.bind(this);
    this.buildForm = this.buildForm.bind(this);
  }

  buildForm() {
    let formData = new FormData();

    if (this.state.username != "") {
      formData.append("username", this.state.username);
    }
    if (this.state.email != "") {
      formData.append("email", this.state.email);
    }
    if (this.state.newpass != "") {
      formData.append("newpass", this.state.newpass);
    }
    if (this.state.recovery_question != "") {
      formData.append("recovery_question", this.state.recovery_question);
    }
    if (this.state.recovery_answer != "") {
      formData.append("recovery_answer", this.state.recovery_answer);
    }
    formData.append("password", this.state.password);

    return formData;
  }

  handleUpdateAccount() {
    event.preventDefault();
    if (this.canSubmit()) {
      axios
        .post("http://localhost:5000/update-account", this.buildForm(), {
          withCredentials: true
        })
        .then(response => {
          if (response.data === "ACCOUNT_UPDATED") {
            this.props.handleSuccessfulUpdate();
            this.setState({
              username: "",
              email: "",
              password: "",
              newpass: "",
              confirm: "",
              recovery_question: '',
              recovery_answer: ''
            });
          } else {
            console.log("update account error", response.data);
          }
        })
        .catch(error => {
          console.log("update account error", error);
        });
    } else {
      console.log("failed submit");
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  canSubmit = () => {
    if (
      this.state.password != "" &&
      this.state.newpass == this.state.confirm &&
      (this.state.username != "" ||
        this.state.email != "" ||
        this.state.newpass != "" ||
        (this.state.recovery_question != "" &&
          this.state.recovery_answer != ""))
    ) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <form className="update-account" onSubmit={this.handleUpdateAccount}>
        <input
          className="update-account__username"
          type="text"
          name="username"
          placeholder="change username"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <input
          className="update-account__email"
          type="text"
          name="email"
          placeholder="change email"
          onChange={this.handleChange}
          value={this.state.email}
        />
        <input
          className="update-account__password"
          type="password"
          name="password"
          placeholder="enter current password"
          onChange={this.handleChange}
          value={this.state.password}
        />
        <input
          className="update-account__newpass"
          type="password"
          name="newpass"
          placeholder="new password"
          onChange={this.handleChange}
          value={this.state.newpass}
        />
        <input
          className="update-account__confirm"
          type="password"
          name="confirm"
          placeholder="confirm new password"
          onChange={this.handleChange}
          value={this.state.confirm}
        />
        <input
          className="update-account__recovery-question"
          type="text"
          name="recovery_question"
          placeholder="recovery question"
          onChange={this.handleChange}
          value={this.state.recovery_question}
        />
        <input
          className="update-account__recovery-answer"
          type="text"
          name="recovery_answer"
          placeholder="new recovery answer"
          onChange={this.handleChange}
          value={this.state.recovery_answer}
        />
        {this.canSubmit() ? (
          <button
            className="button update-account__submit"
            onClick={this.handleUpdateAccount}
            type="submit"
          >
            Submit
          </button>
        ) : (
          <div className="button update-account__submit">
            Enter Password to Submit
          </div>
        )}
      </form>
    );
  }
}
