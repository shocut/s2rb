import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ currentUser, location, ...rest }) => {
  if (currentUser) {
    return <Route location={location} {...rest} />;
  } else {
    return (
      <Redirect
        to={{
          pathname: "/unauthorized",
          state: { from: { location } },
        }}
      />
    );
  }
};

ProtectedRoute.propTypes = {
  currentUser: PropTypes.string,
  location: PropTypes.object,
};
export default ProtectedRoute;
