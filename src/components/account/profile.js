import * as $ from "jquery";
import React, { Component } from "react";
import uuid from "uuid";
import Training from "./Feed/trainingpost";

export default class profile extends Component {
  state = {
    email: "",
    university: "",
    training: [],
    name: ""
  };
  componentDidMount() {
    const baseURL =
      "https://s0hzwu6lw6.execute-api.us-east-2.amazonaws.com/dev";
    const url = baseURL + "/user?email=yashi3456@gmail.com";
    $.ajax({
      error: data =>
        console.log("could not call lambda. something went wrong."),
      success: returnData => {
        const tempTraining = [];
        const trainingReal = [];

        console.log(JSON.stringify(returnData));
        console.log(returnData.Item.University.S);
        console.log(returnData.Item.Training.L);
        returnData.Item.Training.L.forEach(training => {
          trainingReal.push({
            id: uuid(),
            duration: training.M.duration.S,
            trainee: "You",
            level: training.M.level.S,
            link: training.M.link.S,
            name: training.M.name.S,
            trainingBy: training.M.trainingBy.S
          });
        });
        this.setState({
          training: trainingReal,
          email: returnData.Item.UserId.S,
          university: returnData.Item.University.S,
          name: returnData.Item.Name.S
        });
      },
      type: "GET",
      url
    });
  }

  render() {
    return (
      <div style={{ textAlign: "left" }}>
        <h1 className="display-1">{this.state.name}</h1>
        <h1 className="lead">Email: {this.state.email}</h1>
        <h1 className="lead">University: {this.state.university}</h1>
        <h1 className="display-4" style={{ marginTop: 100 }}>
          Your Trainings
        </h1>
        {this.state.training.map(training => (
          <Training key={training.id} training={training} />
        ))}
      </div>
    );
  }
}
