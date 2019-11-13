import React, { Component } from "react";
import axios from "axios";

export default class CampEditForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.campaign.campaign_name,
      desc: this.props.campaign.campaign_desc,
      campaign_id: this.props.campaign.campaign_id,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buildForm = this.buildForm.bind(this);
  }

  buildForm() {
    let formData = new FormData();

    formData.append("campaign_name", this.state.name);
    formData.append("campaign_desc", this.state.desc);
    formData.append("campaign_id", this.state.campaign_id);
    formData.append("campaign_owner_id", this.state.campaign_owner_id);

    return formData;
  }

  handleSubmit(event) {
    axios
      .post("http://localhost:5000/edit-campaign", this.buildForm(), {
        withCredentials: true
      })
      .then(response => {
        if (response.data === 'CAMPAIGN_UPDATED') {
          this.props.handleSuccessfulSubmit();
        } else {
          console.log('campaign update error', response.data);
        }
      })
      .catch(error => {
        console.log("edit campaign error", error);
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
          name="desc"
          type="text"
          placeholder="description"
          value={this.state.desc}
        />

        <button>Save</button>
      </form>
    );
  }
}
