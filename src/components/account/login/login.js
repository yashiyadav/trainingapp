import * as $ from "jquery";
import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { Redirect, withRouter } from "react-router";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      toFeed: false,
      username: "",
      Password: ""
    };
    document.title = "Log in";
  }
  onChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });
  render() {
    return (
      <div className="container">
        <form id="login-form" className="form_wizard wizard_horizontal">
          <div className="col-xs-12 form-group">
            <label className="control-label">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="col-xs-12 form-control"
              onChange={this.onChange}
            />
          </div>
          <div className="col-xs-12 form-group">
            <label className="control-label">Password</label>
            <input
              type="password"
              name="Password"
              placeholder="Password"
              className="col-xs-12 form-control"
              onChange={this.onChange}
            />
          </div>
          <div className="col-xs-12 form-group">
            <button
              type="button"
              onClick={this.submitUser}
              className="btn btn-primary form-control"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  submitUser = async event => {
    event.preventDefault();
    debugger;
    console.log("call login lambda here");
    console.log(this.state.username);
    console.log(this.state.Password);
    const baseURL =
      "https://s0hzwu6lw6.execute-api.us-east-2.amazonaws.com/dev";
    const loggedIn = false;
    try {
      await Auth.signIn(this.state.username, this.state.Password);

      this.props.history.push("/feed");
      return true;
    } catch (e) {
      alert(e.message);
      return false;
    }
  };
}

export default withRouter(LoginPage);
