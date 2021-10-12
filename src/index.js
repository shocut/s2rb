import React from "react";
import ReactDOM from "react-dom";
import Amplify, { DataStore, AuthModeStrategyType } from "aws-amplify";
import awsconfig from "./aws-exports";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./index.css";
import "./common/scss/material.scss";

import SellerProfile from "./sellerinfo/SellerProfile.js";
import SDashboard from "./dashboard/SDashboard";
import HomeList from "./listings/HomeList";
import Referral from "./referral/Referral";
import CommingSoon from "./CommingSoon";
import App from "./App";
import Unauthorized from "./common/components/Unauthorized";
import ProtectedRoute from "./common/components/ProtectedRoute";
import Signup from "./common/components/Signup";
import reportWebVitals from "./reportWebVitals";

var hist = createBrowserHistory();

Amplify.configure({
  ...awsconfig,
  ssr: true,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  },
});

DataStore.configure({
  syncPageSize: 100,
});

//Amplify.Logger.LOG_LEVEL = "DEBUG";

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/home" component={App} />
      <Route path="/signin" component={Signup} />
      <Route path="/signup" component={Signup} />
      <Route exact path="/unauthorized" component={Unauthorized} />
      <Route exact path="/app" component={App} />
      <ProtectedRoute exact path="/app/reprofile" component={SellerProfile} />
      <ProtectedRoute exact path="/app/sdashboard" component={SDashboard} />
      <ProtectedRoute exact path="/app/listings" component={HomeList} />
      <ProtectedRoute exact path="/app/referral" component={Referral} />
      <Route path="/" component={CommingSoon} />
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
