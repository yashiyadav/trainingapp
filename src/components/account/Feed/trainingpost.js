import React, { Component } from "react";
import PropTypes from "prop-types";

class Training extends Component {
  state = {
    showTrainingInfo: false
  };

  render() {
    const { training } = this.props;
    const { showTrainingInfo } = this.state;

    return (
      <div className="card card-body mb-3">
        <h6>{training.trainee} started a training</h6>
        <h4>
          {training.name}
          <i
            onClick={() =>
              this.setState({ showTrainingInfo: !this.state.showTrainingInfo })
            }
            className="fas fa-sort-down"
            style={{ cursor: "pointer" }}
          />
        </h4>

        {showTrainingInfo ? (
          <ul className="list-group">
            <li className="list-group-item">By: {training.trainingBy}</li>
            <li className="list-group-item">Duration: {training.duration}</li>
            <li className="list-group-item">Level: {training.level}</li>
            <li className="list-group-item">Link: {training.link}</li>
          </ul>
        ) : null}
      </div>
    );
  }
}

Training.propTypes = {
  training: PropTypes.object.isRequired
};
export default Training;
