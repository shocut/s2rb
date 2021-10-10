import React from "react";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ component: Component, location, ...rest }) => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await Auth.currentAuthenticatedUser();
        if (currentUser) {
          setCurrentUser(currentUser);
        } else {
          setCurrentUser(null);
        }
      } catch (e) {
        setCurrentUser(null);
        console.log(e);
      }
      setCheckingAuth(false);
    })();
  }, []);

  if (checkingAuth) {
    return "Loading..";
  } else {
    if (currentUser) {
      return (
        <Component currentUser={currentUser} location={location} {...rest} />
      );
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
  }
};

ProtectedRoute.propTypes = {
  component: PropTypes.Component,
  currentUser: PropTypes.string,
  location: PropTypes.object,
};
export default ProtectedRoute;
