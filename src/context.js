import * as $ from "jquery";
import React, { Component } from "react";
import uuid from "uuid";
import { Auth } from "aws-amplify";
import Amplify, { API } from "aws-amplify";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRAINING":
      let apiName = "trainingapp-api";
      let path = "/training";
      let newItem = {
        body: {
          // email: Auth.user.attributes.email,
          duration: action.payload.duration,
          level: action.payload.level,
          link: action.payload.link,
          name: action.payload.name,
          trainingBy: action.payload.trainingBy
        }
      };
      API.post(apiName, path, newItem)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        });
      //   $.ajax({
      //     data: JSON.stringify(requestData),
      //     error: data =>
      //       console.log("could not call lambda. something went wrong."),
      //     success: returnData => {
      //       console.log(
      //         "successfully addes training to dynamodb row" +
      //           JSON.stringify(returnData)
      //       );
      //     },
      //     contentType: "application/json",
      //     type: "POST",
      //     url
      //   });

      return {
        ...state,
        trainingposts: [action.payload, ...state.trainingposts]
      };
    default:
      return state;
  }
};
export class Provider extends Component {
  state = {
    trainingposts: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };
  componentDidMount() {
    const baseURL =
      "https://s0hzwu6lw6.execute-api.us-east-2.amazonaws.com/dev";
    const url = baseURL + "/feed";
    let userListTemp = [];
    let userListReal = [];
    $.ajax({
      error: data =>
        console.log("could not call lambda. something went wrong."),
      success: returnData => {
        returnData.Items.forEach(user => {
          if (user.Training.L.length > 0) {
            userListTemp.push(...user.Training.L);
          }
          userListTemp.forEach(training => {
            userListReal.push({
              id: uuid(),
              name: training.M.name.S,
              trainee: user.Name.S,
              trainingBy: training.M.trainingBy.S,
              duration: training.M.duration.S,
              level: training.M.level.S,
              link: training.M.link.S
            });
          });
          userListTemp = [];
        });

        this.setState({
          trainingposts: userListReal
        });
      },
      type: "GET",
      url
    });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
