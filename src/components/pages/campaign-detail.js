import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CampaignModal from "../modals/campaign-modal";
import AlertModal from "../modals/alerts";

export default class CampaignDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentID: this.props.match.params.slug,
      campaign: {
        campaign_name: "",
        campaign_desc: "",
        campaign_owner_id: "",
        campaign_id: ""
      },
      characters: [],
      editModalIsOpen: false,
      confirmModalIsOpen: false
    };
    this.getCampaign = this.getCampaign.bind(this);
    this.handleEditCampClick = this.handleEditCampClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  handleModalClose() {
    this.getCampaign();
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
        `http://localhost:5000/delete-campaign?campaign_id=${this.state.currentID}`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        if (response.data === "CAMPAIGN_DELETED") {
          this.props.history.push("/campaign-management");
        } else {
          console.log("delete error", response.data);
        }
      })
      .catch(error => {
        console.log("delete campaign error", error);
      });
  }

  handleEditCampClick() {
    this.setState({
      editModalIsOpen: true
    });
  }

  getCampaign() {
    axios
      .get(
        `http://localhost:5000/get-campaign?campaign_id=${this.state.currentID}`,
        {
          withCredentials: true
        }
      )
      .then(response => {
        let characters = [];
        response.data.map(response => {
          if ("campaign_id" in response) {
            const {
              campaign_id,
              campaign_name,
              campaign_desc,
              campaign_owner_id
            } = response;
            this.setState({
              campaign: {
                campaign_id: campaign_id,
                campaign_name: campaign_name,
                campaign_desc: campaign_desc,
                campaign_owner_id: campaign_owner_id
              }
            });
          } else if ("character_id" in response) {
            characters.push(response);
          }
          this.setState({
            characters: characters
          });
        });
      })
      .catch(error => {
        console.log("campaign detail error", error);
      });
  }

  componentWillMount() {
    this.getCampaign();
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
        <AlertModal
          modalAction={"CONFIRM"}
          handleModalClose={this.handleModalClose}
          modalIsOpen={this.state.confirmModalIsOpen}
          alertText="Delete Campaign?"
          confirm={this.confirmDelete}
          deny={this.handleModalClose}
        />
        <CampaignModal
          modalAction="EDIT"
          handleModalClose={this.handleModalClose}
          modalIsOpen={this.state.editModalIsOpen}
          campaign={this.state.campaign}
        />
        <div>{this.state.campaign.campaign_name}</div>
        <div>
          <a onClick={this.handleEditCampClick}>
            <FontAwesomeIcon icon="edit" />
          </a>
        </div>
        <div>
          <a onClick={this.handleDeleteClick}>
            <FontAwesomeIcon icon="trash-alt" />
          </a>
        </div>
        <div>{this.state.campaign.campaign_desc}</div>
        <div>
          <ul>{this.state.characters.length > 0 ? characterList : ""}</ul>
        </div>
      </div>
    );
  }
}

//shane
//think of 3 qualities, highlighted positive, resourcesful, continuous improvement, refine this - elevator pitch,
//great communicator - but - have certain points hit hard.
//questions asked - deliberate, pick at least 2 questions to ask based on reviewing the company your applying for,
//ask if they work in an agile enivronment, daily standups, ect - lets them know you're a collaborator
//Aim to not look like anything is a stepping stone
//3:1//focus on sales as an education - name off books that I've studied from to focus on personal study.
//tightenup and spend time on linked in - right now 70 connections, include that in education piece, use year only,
//over 500 connections, add bottega cohorts as connections, people worked with, build connection list.
//about - https://www.linkedin.com/in/camigarrett/  https://www.linkedin.com/in/shayne-roy-2168058/
//redo about section - focus on a current position, more generalized and branded.
//erika a resource for this, the one we emailed resume to,
//make sure resume and linked in are pretty consistent and focused on the same points,
