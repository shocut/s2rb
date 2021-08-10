import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Signup from "./common/components/Signup";
import reportWebVitals from "./reportWebVitals";
import Amplify, { AuthModeStrategyType } from "aws-amplify";
import awsconfig from "./aws-exports";
import "./common/scss/material.scss";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

var hist = createBrowserHistory();

Amplify.configure({
  ...awsconfig,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.DEFAULT,
  },
});

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/home" component={App} />
      <Route path="/signup" component={Signup} />
      <Route path="/" component={App} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
