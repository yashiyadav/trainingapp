import * as $ from "jquery";
import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Redirect } from "react-router";
import { Consumer } from "../../../context";
import Training from "./trainingpost";
import Header from "../header";

class Feed extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { trainingposts } = value;
          return (
            <div>
              {trainingposts.map(training => (
                <Training key={training.id} training={training} />
              ))}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Feed;
