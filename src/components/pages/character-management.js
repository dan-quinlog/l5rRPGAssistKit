import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CharacterModal from "../modals/character-modal";

export default class CampaignManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      characters: [],
      modalIsOpen: false
    };
    this.buildCharacters = this.buildCharacters.bind(this);
    this.handleCreateCharClick = this.handleCreateCharClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.buildCharacters();
    this.setState({
      modalIsOpen: false
    });
  }

  handleCreateCharClick() {
    this.setState({
      modalIsOpen: true
    });
  }

  buildCharacters() {
    axios
      .get("http://localhost:5000/get-my-characters", {
        withCredentials: true
      })
      .then(response => {
        if (response.data != "AUTH_FAILED" && response.data.length > 0) {
          this.setState({
            characters: response.data
          });
        }
      })
      .catch(error => {
        console.log("app mount error", error);
      });
  }

  componentWillMount() {
    this.buildCharacters();
  }

  render() {
    const characterList = this.state.characters.map(character => {
      return (
        <li key={character.character_id}>
          <Link
            to={`/character/${character.character_id}`}
            className="info__link"
          >
            {character.character_name}
          </Link>
        </li>
      );
    });
    return (
      <div>
        <CharacterModal
          modalAction="CREATE"
          handleModalClose={this.handleModalClose}
          modalIsOpen={this.state.modalIsOpen}
        />
        <button onClick={this.handleCreateCharClick}>
          create new character
        </button>
        <div>Character List</div>
        <div>
          <ul>{this.state.characters.length > 0 ? characterList : ""}</ul>
        </div>
      </div>
    );
  }
}
