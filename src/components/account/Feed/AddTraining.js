import React, { Component } from "react";
import { Consumer } from "../../../context";
import TextInputGroup from "../../layout/TextInputGroup";
import uuid from "uuid";

class AddTraining extends Component {
  state = {
    name: "",
    trainee: "",
    trainingBy: "",
    duration: "",
    level: "",
    link: ""
  };

  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  onSubmit = (dispatch, e) => {
    e.preventDefault();
    const { duration, trainee, trainingBy, name, level, link } = this.state;
    const newTraining = {
      id: uuid(),
      duration,
      trainee,
      trainingBy,
      name,
      level,
      link
    };
    dispatch({ type: "ADD_TRAINING", payload: newTraining });

    this.setState({
      name: "",
      trainee: "",
      trainingBy: "",
      duration: "",
      level: "",
      link: ""
    });

    this.props.history.push("/Feed");
  };

  render() {
    const { name, trainee, trainingBy, duration, level, link } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Training</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Training Name"
                    value={name}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label="Trainee"
                    name="trainee"
                    placeholder="Your name"
                    value={trainee}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label="Training By"
                    name="trainingBy"
                    placeholder="Training by"
                    value={trainingBy}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label="Duration"
                    name="duration"
                    placeholder="Duration"
                    value={duration}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label="Level"
                    name="level"
                    placeholder="Level"
                    value={level}
                    onChange={this.onChange}
                  />
                  <TextInputGroup
                    label="Link"
                    name="link"
                    placeholder="Link"
                    value={link}
                    onChange={this.onChange}
                  />
                  <input
                    type="submit"
                    value="Add Training"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddTraining;
