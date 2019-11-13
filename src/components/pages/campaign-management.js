import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import CampaignModal from "../modals/campaign-modal";

export default class CampaignManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campaigns: [],
      modalIsOpen: false
    };
    this.buildCampaigns = this.buildCampaigns.bind(this);
    this.handleCreateCampClick = this.handleCreateCampClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.buildCampaigns();
    this.setState({
      modalIsOpen: false
    });
  }

  handleCreateCampClick() {
    this.setState({
      modalIsOpen: true
    });
  }

  buildCampaigns() {
    axios
      .get("http://localhost:5000/get-my-campaigns", {
        withCredentials: true
      })
      .then(response => {
        if (response.data != "AUTH_FAILED" && response.data.length > 0) {
          this.setState({
            campaigns: response.data
          });
        }
      })
      .catch(error => {
        console.log("app mount error", error);
      });
  }

  componentWillMount() {
    this.buildCampaigns();
  }

  render() {
    const campaignList = this.state.campaigns.map(campaign => {
      return (
        <li key={campaign.campaign_id}>
          <Link to={`/campaign/${campaign.campaign_id}`} className="info__link">
            {campaign.campaign_name}
          </Link>
        </li>
      );
    });
    return (
      <div>
        <CampaignModal
          modalAction="CREATE"
          handleModalClose={this.handleModalClose}
          modalIsOpen={this.state.modalIsOpen}
        />
        <button onClick={this.handleCreateCampClick}>
          create new campaign
        </button>
        <div>Campaign List</div>
        <div>
          <ul>{this.state.campaigns.length > 0 ? campaignList : ""}</ul>
        </div>
      </div>
    );
  }
}
