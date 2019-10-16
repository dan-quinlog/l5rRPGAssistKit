import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class DieStatisticPage extends Component {
  constructor() {
    super();

    this.state = {
      quantity_ring: "",
      quantity_skill: "",
      quantity_kept: "",
      target_tn: "",
      target_opp: "",
      advantaged: "nullvantaged",
      quantity_rolls: "",
      isLoading: false,
      viewResult: false,
      times_rolled: '',
      roll_success: "",
      total_success: "",
      total_opportunity: "",
      total_strife: ""
    };

    this.ring_dice = {
      1: "blank",
      2: "success",
      3: "opportunity",
      4: "success strife",
      5: "opportunity strife",
      6: "explosive success strife"
    };
    this.skill_dice = {
      1: "blank",
      2: "blank",
      3: "success",
      4: "success",
      5: "opportunity",
      6: "opportunity",
      7: "opportunity",
      8: "success opportunity",
      9: "success strife",
      10: "success strife",
      11: "explosive success",
      12: "explosive success strife"
    };

    this.handleStartRolling = this.handleStartRolling.bind(this);
    this.handleDieStatSubmit = this.handleDieStatSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.rollDice = this.rollDice.bind(this);
    this.diceRoll = this.diceRoll.bind(this);
    this.sortDice = this.sortDice.bind(this);
    this.rerollDice = this.rerollDice.bind(this);
    this.keepDice = this.keepDice.bind(this);
    this.explodeDice = this.explodeDice.bind(this);
    this.countUp = this.countUp.bind(this);
  }

  handleStartRolling(event) {
    this.setState({ isLoading: true });
    event.preventDefault();
    setTimeout(
      function() {
        this.handleDieStatSubmit();
      }.bind(this),
      100
    );
  }

  handleDieStatSubmit() {
    const ring = this.state.quantity_ring;
    const skill = this.state.quantity_skill;
    const kept = this.state.quantity_kept;
    const tn = this.state.target_tn;
    const opp = this.state.target_opp || 0;
    const advantage = this.state.advantaged;
    const total_rolls = this.state.quantity_rolls;

    let roll_success = 0;
    let total_success = 0;
    let total_opportunity = 0;
    let total_strife = 0;

    for (var i = 0; i < total_rolls; i++) {
      const this_roll = this.rollDice(ring, skill, kept, tn, advantage);
      total_success += this.countUp(this_roll, "success");
      total_opportunity += this.countUp(this_roll, "opportunity");
      total_strife += this.countUp(this_roll, "strife");
      if (
        this.countUp(this_roll, "success") >= tn &&
        this.countUp(this_roll, "opportunity") >= opp
      ) {
        roll_success++;
      }
    }
    roll_success = ((roll_success / total_rolls) * 100).toFixed(2);
    total_success = (total_success / total_rolls).toFixed(2);
    total_opportunity = (total_opportunity / total_rolls).toFixed(2);
    total_strife = (total_strife / total_rolls).toFixed(2);
    this.setState({
      isLoading: false,
      viewResult: true,
      times_rolled: this.state.quantity_rolls,
      roll_success: roll_success,
      total_success: total_success,
      total_opportunity: total_opportunity,
      total_strife: total_strife
    });
  }

  rollDice(ring, skill, kept, tn, advantage) {
    let result = [];
    for (var i = 0; i < ring; i++) {
      result.push([this.ring_dice[this.diceRoll("ring")], "ring"]);
    }
    for (var i = 0; i < skill; i++) {
      result.push([this.skill_dice[this.diceRoll("skill")], "skill"]);
    }
    result = this.sortDice(result);

    result = this.rerollDice(result, advantage);

    result = this.keepDice(result, kept, tn);

    result = this.explodeDice(result);

    return result;
  }

  diceRoll(die_type) {
    let faces;
    if (die_type === "skill") {
      faces = 12;
    } else {
      faces = 6;
    }
    return Math.floor(Math.random() * (faces - 1) + 1);
  }

  sortDice(result) {
    const sort = (result, face) => {
      for (var i = 0; i < result.length; i++) {
        for (var k = i; k < result.length; k++) {
          if (result[k][0] === face) {
            var capture = result.splice(k, 1);
            result.unshift([capture[0][0], capture[0][1]]);
          }
        }
      }
    };

    sort(result, "blank");
    sort(result, "opportunity strife");
    sort(result, "opportunity");
    sort(result, "success strife");
    sort(result, "success");
    sort(result, "success opportunity");
    sort(result, "explosive success strife");
    sort(result, "explosive success"); //lowest on the list is highest priority selection
    return result;
  }

  rerollDice(result, advantage) {
    if (advantage === "advantaged") {
      for (let i = result.length - 1; i >= result.length - 2; i--) {
        if (result[i][0].indexOf("success") === -1) {
          result[i][0] === "skill"
            ? (result[i] = [this.skill_dice[this.diceRoll("skill")], "skill"])
            : (result[i] = [this.ring_dice[this.diceRoll("ring")], "ring"]);
        }
      }
    } else if (advantage === "disadvantaged") {
      for (let i = 0; i > 2; i++) {
        if (result[i][0].indexOf("success") > -1) {
          result[i][0] === "skill"
            ? (result[i] = [this.skill_dice[this.diceRoll("skill")], "skill"])
            : (result[i] = [this.ring_dice[this.diceRoll("ring")], "ring"]);
        }
      }
    }
    return this.sortDice(result);
  }

  keepDice(result, kept, tn) {
    let successCount = 0;
    let kept_dice = [];
    for (let i = 0; i < result.length; i++) {
      let keep = false;
      if (successCount < tn) {
        if (result[i][0].indexOf("success") > -1) {
          successCount++;
          keep = true;
        }
      }
      if (result[i][0].indexOf("opportunity") > -1) {
        keep = true;
      }
      if (keep === true) {
        kept_dice.push(result[i]);
      }
      if (kept_dice.length >= kept) {
        return this.sortDice(kept_dice);
      }
    }
    return this.sortDice(kept_dice);
  }

  explodeDice(result) {
    for (let i = 0; i < result.length; i++) {
      if (result[i][0].indexOf("explosive") > -1) {
        result[i][0] === "skill"
          ? result.push([this.skill_dice[this.diceRoll("skill")], "skill"])
          : result.push([this.ring_dice[this.diceRoll("ring")], "ring"]);
      }
    }
    return this.sortDice(result);
  }

  countUp(this_roll, type) {
    let count = 0;
    for (let i = 0; i < this_roll.length; i++) {
      if (this_roll[i][0].indexOf(type) > -1) {
        count++;
      }
    }
    return count;
  }

  handleChange(event) {
    if (event.target.name === "advantaged" || !isNaN(event.target.value)) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  }

  render() {
    return (
      <div className="die-statistic-page-wrapper">
        <h1>
          Try out our die statistic generator. Know your chances before you
          roll!
        </h1>
        <form
          className="die-statistic-wrapper"
          onSubmit={this.handleDieStatSubmit}
        >
          <input
            className="dice-input"
            type="text"
            name="quantity_ring"
            placeholder="Ring Dice"
            onChange={this.handleChange}
            value={this.state.quantity_ring}
          />
          <input
            className="dice-input"
            type="text"
            name="quantity_skill"
            placeholder="Skill Dice"
            onChange={this.handleChange}
            value={this.state.quantity_skill}
          />
          <input
            className="dice-input"
            type="text"
            name="quantity_kept"
            placeholder="Quantity Kept"
            onChange={this.handleChange}
            value={this.state.quantity_kept}
          />
          <input
            className="dice-input"
            type="text"
            name="target_tn"
            placeholder="Required TN to Succeed"
            onChange={this.handleChange}
            value={this.state.target_tn}
          />
          <input
            className="dice-input"
            type="text"
            name="target_opp"
            placeholder="Required Opportunities"
            onChange={this.handleChange}
            value={this.state.target_opp}
          />
          <select
            className="dice-input"
            onChange={this.handleChange}
            value={this.state.advantaged}
            name="advantaged"
          >
            <option value="nullvantaged">No Modifier</option>
            <option value="advantaged">Advantaged</option>
            <option value="disadvantaged">Disadvantaged</option>
          </select>
          <input
            className="dice-input"
            type="text"
            name="quantity_rolls"
            placeholder="Note: larger roll counts will take longer to process"
            onChange={this.handleChange}
            value={this.state.quantity_rolls}
          />
          <button
            className="button"
            onClick={this.handleStartRolling}
            type="submit"
          >
            Submit
          </button>
        </form>
        {this.state.isLoading ? (
          <div className="loading-spinner">
            <FontAwesomeIcon icon="spinner" spin />
          </div>
        ) : null}
        {this.state.viewResult ? (
          <div className="die-result-view">
            Rolling {this.state.times_rolled} times:
            <br />
            Roll Success: {this.state.roll_success}%
            <br />
            Average Success: {this.state.total_success}
            <br />
            Average Opportunity: {this.state.total_opportunity}
            <br />
            Average Strife: {this.state.total_strife}
          </div>
        ) : null}
      </div>
    );
  }
}
