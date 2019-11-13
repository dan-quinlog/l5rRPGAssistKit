import React, { Component } from "react";
import ReactModal from "react-modal";

import CampCreateForm from "../forms/camp-create-form";
import CampEditForm from "../forms/camp-edit-form";

ReactModal.setAppElement(".app-wrapper");

export default class CharacterModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalAction: this.props.modalAction
    }

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
    this.formType = this.formType.bind(this);
  }

  handleSuccessfulSubmit() {
    this.props.handleModalClose();
  }

  formType(action) {
    switch (action) {
      case 'CREATE':
        return <CampCreateForm handleSuccessfulSubmit={this.handleSuccessfulSubmit} />;
      case 'EDIT':
        return <CampEditForm handleSuccessfulSubmit={this.handleSuccessfulSubmit} campaign={this.props.campaign} />;
    }
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
        {this.formType(this.state.modalAction)}
      </ReactModal>
    );
  }
}
