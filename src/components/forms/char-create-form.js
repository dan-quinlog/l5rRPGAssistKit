import React, { Component } from "react";
import axios from "axios";

export default class CharEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      background: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildForm = this.buildForm.bind(this);
  }

  buildForm() {
    let formData = new FormData();

    formData.append("character_name", this.state.name);
    formData.append("character_background", this.state.background);

    return formData;
  }

  handleSubmit(event) {
    axios
      .post("http://localhost:5000/create-character", this.buildForm(), {
        withCredentials: true
      })
      .then(response => {
        if (response.data === 'CHARACTER_CREATED') {
          this.props.handleSuccessfulSubmit();
        } else {
          console.log('creation error', response.data);
        }
      })
      .catch(error => {
        console.log("create character error", error);
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
