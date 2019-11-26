import React, { Component } from "react";
import ReactModal from "react-modal";

import UserEditForm from "../forms/user-edit-form";

ReactModal.setAppElement(".app-wrapper");

export default class UserModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: "",
      username: "",
      email: "",
      permission: ""
    };

    this.customStyles = {
      content: {
        top: "50%",
        left: "50%",
        right: "auth",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "800px"
      },
      overlay: {
        backgroundColor: "rgba(1,1,1,0.75)"
      }
    };

    this.handleSuccessfulSubmit = this.handleSuccessfulSubmit.bind(this);
  }

  update(user) {
    this.setState({
      user_id: user.user_id,
      username: user.user_username,
      email: user.user_email,
      permission: user.user_permission
    });
  }

  handleSuccessfulSubmit() {
    this.props.handleModalClose();
  }

  render() {
    return (
      <ReactModal
        style={this.customStyles}
        onRequestClose={() => {
          this.props.handleModalClose();
        }}
        isOpen={this.props.modalIsOpen}
      >
        <UserEditForm
          user_id={this.state.user_id}
          username={this.state.username}
          email={this.state.email}
          permission={this.state.permission}
          handleSuccessfulSubmit={this.handleSuccessfulSubmit}
        />
      </ReactModal>
    );
  }
}
