import React, { Component } from "react";
import ReactModal from "react-modal";

import ConfirmLayout from "../forms/confirm-layout";
import AlertLayout from "../forms/alert-layout";
import TooltipLayout from "../forms/tooltip-layout";

ReactModal.setAppElement(".app-wrapper");

export default class AlertModal extends Component {
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
        width: "400px"
      },
      overlay: {
        backgroundColor: "rgba(1,1,1,0.75)"
      }
    };

    this.formType = this.formType.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleConfirm() {
    this.props.modalConfirm();
  }

  formType(action) {
    switch (action) {
      case 'ALERT':
        return <AlertLayout />;
      case 'CONFIRM':
        return <ConfirmLayout alertText={this.props.alertText} confirm={this.props.confirm} deny={this.props.deny} />;
      case 'TOOLTIP':
        return <TooltipLayout />;
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
