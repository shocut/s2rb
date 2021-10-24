import React from "react";
import ReactDOM from "react-dom";
import Amplify, {
  Logger,
  DataStore,
  AuthModeStrategyType,
  Analytics,
} from "aws-amplify";
import { AWSCloudWatchProvider } from "@aws-amplify/core";
import awsconfig from "./aws-exports";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import "./index.css";
import "./common/scss/material.scss";

import SellerProfile from "./sellerinfo/SellerProfile.js";
import SDashboard from "./dashboard/SDashboard";
import HomeList from "./listings/HomeList";
import Referral from "./referral/Referral";
import CommingSoon from "./CommingSoon";
import App from "./App";
import ErrorFallback from "./common/components/ErrorFallback";
import Unauthorized from "./common/components/Unauthorized";
import ProtectedRoute from "./common/components/ProtectedRoute";
import Signup from "./common/components/Signup";

var hist = createBrowserHistory();

Amplify.configure({
  ...awsconfig,
  ssr: true,
  Logging: {
    logGroupName: "s2rb-webapp-dev",
    logStreamName: "browser-logs",
    region: "us-east-1",
  },
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH,
  },
});

const analyticsConfig = {
  AWSPinpoint: {
    // Amazon Pinpoint App Client ID
    appId: "9a1650ed6473474cae14ca6650b98bed",
    // Amazon service region
    region: "us-east-1",
    mandatorySignIn: false,
  },
};
Analytics.configure(analyticsConfig);
Analytics.record({ name: "s2rb index.js init" });
const logger = new Logger("s2rb-webapp-logger");
Amplify.register(logger);
logger.addPluggable(new AWSCloudWatchProvider());

const globalErrorHandler = (error: Error, info: { componentStack: string }) => {
  // Do something with the error
  // E.g. log to an error logging client here
  console.log("GlobalErrorHandler: An error occurred " + error + info);
  logger.error(error, info);
};

DataStore.configure({
  syncPageSize: 100,
});

//Amplify.Logger.LOG_LEVEL = "DEBUG";

ReactDOM.render(
  <ErrorBoundary
    onError={globalErrorHandler}
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
  >
    <Router history={hist}>
      <Switch>
        <Route path="/home" component={App} />
        <Route path="/signin" component={Signup} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/unauthorized" component={Unauthorized} />
        <Route exact path="/app" component={App} />
        <ProtectedRoute path="/app/reprofile" component={SellerProfile} />
        <ProtectedRoute path="/app/sdashboard" component={SDashboard} />
        <ProtectedRoute exact path="/app/listings" component={HomeList} />
        <ProtectedRoute exact path="/app/referral" component={Referral} />
        <Route path="/" component={CommingSoon} />
      </Switch>
    </Router>
  </ErrorBoundary>,
  document.getElementById("root")
);
