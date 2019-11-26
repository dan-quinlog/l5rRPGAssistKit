import React, { Component } from "react";
import axios from "axios";

import AlertModal from "../modals/alerts";
import UserModal from "../modals/user-modal";

export default class AdminPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userquery: "",
      searchtype: "user_username",
      userlist: [],
      userModalIsOpen: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearchAccount = this.handleSearchAccount.bind(this);
    this.loadUserModal = this.loadUserModal.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.updateModalInfo = React.createRef();
  }

  loadUserModal(user) {
    this.updateModalInfo.current.update(user);
    this.setState({
      userModalIsOpen: true
    });
  }

  handleModalClose() {
    this.setState({
      userModalIsOpen: false
    });
    this.handleSearchAccount();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSearchAccount() {
    event.preventDefault();
    axios
      .get(
        `http://localhost:5000/userquery?searchtype=${this.state.searchtype}&userquery=${this.state.userquery}`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        if (response.data != "AUTH_FAILED" && response.data.length > 0) {
          this.setState({
            userlist: response.data
          });
        }
      })
      .catch(error => {
        console.log("get account info error", error);
      });
  }

  render() {
    const userList = this.state.userlist.map(user => {
      return (
        <li key={user.user_id} onClick={() => this.loadUserModal(user)}>
          UserID: {user.user_id}, Username: {user.user_username}, Email:{" "}
          {user.user_email}, Permissions: {user.user_permission}
        </li>
      );
    });
    return (
      <div>
        <AlertModal
          modalAction={"CONFIRM"}
          handleModalClose={this.handleModalClose}
          modalIsOpen={this.state.confirmModalIsOpen}
          alertText="Update Campaign?"
          confirm={this.confirmDelete}
          deny={this.handleModalClose}
        />
        <UserModal
          handleModalClose={this.handleModalClose}
          modalIsOpen={this.state.userModalIsOpen}
          ref={this.updateModalInfo}
        />
        <form className="user-admin" onSubmit={this.handleSearchAccount}>
          <input
            className="user-admin__userquery"
            type="text"
            name="userquery"
            placeholder="search users"
            onChange={this.handleChange}
            value={this.state.userquery}
          />
          <select
            className="user-admin__searchtype"
            onChange={this.handleChange}
            value={this.state.searchtype}
            name="searchtype"
          >
            <option value="user_username">username</option>
            <option value="user_id">user id</option>
          </select>
          <button
            className="button user-admin__submit"
            onClick={this.handleSearchAccount}
            type="submit"
          >
            Submit
          </button>
        </form>
        <div>
          <ul>{this.state.userlist.length > 0 ? userList : ""}</ul>
        </div>
      </div>
    );
  }
}
