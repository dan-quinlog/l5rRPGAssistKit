import React, { Component } from "react";
import ReactModal from "react-modal";

import CharCreateForm from "../forms/char-create-form";
import CharEditForm from "../forms/char-edit-form";

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
        return <CharCreateForm handleSuccessfulSubmit={this.handleSuccessfulSubmit} />;
      case 'EDIT':
        return <CharEditForm handleSuccessfulSubmit={this.handleSuccessfulSubmit} character={this.props.character} />;
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
