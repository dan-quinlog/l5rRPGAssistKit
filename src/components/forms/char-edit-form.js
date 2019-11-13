import React, { Component } from "react";
import axios from "axios";

export default class CharEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.character.name,
      background: this.props.character.background,
      character_id: this.props.character.character_id,
      owner_id: this.props.character.owner_id,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildForm = this.buildForm.bind(this);
  }

  buildForm() {
    let formData = new FormData();

    formData.append("character_name", this.state.name);
    formData.append("character_background", this.state.background);
    formData.append("character_character_id", this.state.character_id);

    return formData;
  }

  handleSubmit(event) {
    axios
      .post("http://localhost:5000/edit-character", this.buildForm(), {
        withCredentials: true
      })
      .then(response => {
        if (response.data === 'CHARACTER_UPDATED') {
          this.props.handleSuccessfulSubmit();
        } else {
          console.log('update error', response.data);
        }
      })
      .catch(error => {
        console.log("edit character error", error);
      });
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          onChange={this.handleChange}
          name="name"
          type="text"
          placeholder="name"
          value={this.state.name}
        />
        <input
          onChange={this.handleChange}
          name="background"
          type="text"
          placeholder="background"
          value={this.state.background}
        />

        <button>Save</button>
      </form>
    );
  }
}
