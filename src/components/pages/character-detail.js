import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CharacterModal from "../modals/character-modal";
import AlertModal from "../modals/alerts";

export default class CharacterDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentID: this.props.match.params.slug,
      character: {
        name: "",
        background: "",
        character_owner_id: "",
        character_id: ""
      },
      editModalIsOpen: false,
      confirmModalIsOpen: false
    };
    this.getCharacter = this.getCharacter.bind(this);
    this.handleEditCharClick = this.handleEditCharClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.getCharacter();
    this.setState({
      editModalIsOpen: false,
      confirmModalIsOpen: false
    });
  }

  handleDeleteClick() {
    console.log("handle delete click");
    this.setState({
      confirmModalIsOpen: true
    });
  }

  confirmDelete() {
    axios
      .delete(
        `http://localhost:5000/delete-character?character_id=${this.state.currentID}`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        if (response.data === "CHARACTER_DELETED") {
          this.props.history.push("/character-management");
        } else {
          console.log("delete error", response.data);
        }
      })
      .catch(error => {
        console.log("delete character error", error);
      });
  }

  handleEditCharClick() {
    this.setState({
      editModalIsOpen: true
    });
  }

  getCharacter() {
    axios
      .get(
        `http://localhost:5000/get-character?character_id=${this.state.currentID}`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        this.setState({
          character: {
            name: response.data[0].character_name,
            background: response.data[0].character_background,
            character_id: response.data[0].character_id,
            character_owner_id: response.data[0].character_owner_id
          }
        });
      })
      .catch(error => {
        console.log("campaign detail error", error);
      });
  }

  componentWillMount() {
    this.getCharacter();
  }

  render() {
    return (
      <div>
        <AlertModal
          modalAction={"CONFIRM"}
          handleModalClose={this.handleModalClose}
          modalIsOpen={this.state.confirmModalIsOpen}
          alertText="Delete Campaign?"
          confirm={this.confirmDelete}
          deny={this.handleModalClose}
        />
        <CharacterModal
          modalAction="EDIT"
          handleModalClose={this.handleModalClose}
          modalIsOpen={this.state.editModalIsOpen}
          character={this.state.character}
        />
        <div>
          {this.state.character.name}
          <div>
            <a onClick={this.handleEditCharClick}>
              <FontAwesomeIcon icon="edit" />
            </a>
          </div>
          <div>
            <a onClick={this.handleDeleteClick}>
              <FontAwesomeIcon icon="trash-alt" />
            </a>
          </div>
        </div>
        <div>{this.state.character.background}</div>
      </div>
    );
  }
}
