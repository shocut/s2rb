import React from "react";
import ReactDOM from "react-dom";
import Amplify, { AuthModeStrategyType } from "aws-amplify";
import awsconfig from "./aws-exports";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "./index.css";
import "./common/scss/material.scss";

import CommingSoon from "./CommingSoon";
import App from "./App";
import Signup from "./common/components/Signup";
import SellerProfile from "./sellerinfo/SellerProfile.js";
import SDashboard from "./dashboard/SDashboard";
import HomeList from "./listings/HomeList";
import Referral from "./referral/Referral";

import reportWebVitals from "./reportWebVitals";

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
      <Route path="/reprofile" component={SellerProfile} />
      <Route path="/sdashboard" component={SDashboard} />
      <Route path="/app" component={App} />
      <Route path="/listings" component={HomeList} />
      <Route path="/referral" component={Referral} />

      <Route path="/" component={CommingSoon} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
