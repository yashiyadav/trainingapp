import React, { Component } from "react";
import { Provider } from "./context";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/account/login/login";
import Feed from "./components/account/Feed/feed";
import AddTraining from "./components/account/Feed/AddTraining";
import Header from "./components/account/header";
import Profile from "./components/account/profile";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header branding="My Training App" />

            <div className="container">
              <Switch>
                <Route exact={true} path="/" render={() => <Login />} />
                <Route path="/Feed" component={Feed} />
                <Route path="/Training/Add" component={AddTraining} />
                <Route path="/Profile" component={Profile} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
