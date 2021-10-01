import React from "react";
import PropTypes from "prop-types";

import queryString from "query-string";
import { Auth } from "aws-amplify";
import { AuthState } from "@aws-amplify/ui-components";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import {
  AmplifySignUp,
  AmplifyAuthenticator,
  AmplifyConfirmSignUp,
  AmplifyForgotPassword,
  AmplifyConfirmSignIn,
  AmplifySignIn,
  AmplifyAuthContainer,
} from "@aws-amplify/ui-react";
import Amplify from "aws-amplify";
import aws_exports from "../../aws-exports";
import Background from "../img/home-bg.jpg";

import styles from "../jss/signUpStyle.js";
const useStyles = makeStyles(styles);

Amplify.configure(aws_exports);

function Signup(props) {
  const classes = useStyles();
  const history = useHistory();
  var currentAuthState = AuthState.SignIn;
  const queryValues = queryString.parse(props.location.search);
  console.log("props.location.", props.location.pathname);
  if (props.location.pathname == "/signup") {
    currentAuthState = AuthState.SignUp;
  }
  var nextPage = "/sdashboard";
  if (queryValues.ref) {
    //need a better check to make sure we don't route to any page
    nextPage = queryValues.ref;
  }

  const checkLoginState = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser) {
        /*
        const groups =
          currentUser.signInUserSession.accessToken.payload["cognito:groups"];
        console.log(JSON.stringify(groups));
        console.log(groups.includes("admin"));
       */

        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        history.push(nextPage);
      }
    } catch (e) {
      clearUserState();
    }
  };

  const clearUserState = () => {
    localStorage.removeItem("currentUser");
  };

  function onAuthStateChange(nextAuthState) {
    if (nextAuthState === AuthState.SignedIn) {
      checkLoginState();
    } else {
      clearUserState();
    }
  }

  return (
    <div>
      <div
        className={classes.loginContainer}
        style={{
          display: "flex",
          backgroundImage: `url(${Background})`,
        }}
      >
        <div className={classes.center}>
          <AmplifyAuthContainer authState="signUp">
            <AmplifyAuthenticator
              usernameAlias="email"
              handleAuthStateChange={onAuthStateChange}
              initialAuthState={currentAuthState}
            >
              <AmplifySignUp
                slot="sign-up"
                usernameAlias="email"
                headerText="Sign Up for S2RB"
                formFields={[
                  {
                    type: "given_name",
                    label: " First Name ",
                    placeholder: "first name",
                    inputProps: { required: true, autocomplete: "given_name" },
                  },

                  {
                    type: "family_name",
                    label: " Last Name ",
                    placeholder: "last name",
                    inputProps: { required: true, autocomplete: "family_name" },
                  },
                  {
                    type: "email",
                    label: " Email ",
                    placeholder: "email address",
                    inputProps: { required: true, autocomplete: "username" },
                  },
                  {
                    type: "password",
                    label: " Password ",
                    placeholder: "Custom password placeholder",
                    inputProps: {
                      required: true,
                      autocomplete: "password",
                    },
                  },
                  {
                    type: "phone_number",
                    label: " Phone ",
                    placeholder: "phone number",
                    inputProps: {
                      required: true,
                      autocomplete: "phone_number",
                    },
                  },
                ]}
              />
              <AmplifySignIn
                slot="sign-in"
                usernameAlias="email"
                headerText="Sign In to your S2RB account"
              />
              <AmplifyConfirmSignUp
                headerText="Please enter your email and the verification code sent to your phone:"
                slot="confirm-sign-up"
                usernameAlias="email"
              ></AmplifyConfirmSignUp>
              <AmplifyConfirmSignIn
                headerText="Please enter the verification code sent to your phone:"
                slot="confirm-sign-in"
              ></AmplifyConfirmSignIn>
            </AmplifyAuthenticator>
            <AmplifyForgotPassword
              headerText="Please enter your S2RB email:"
              slot="forgot-password"
            ></AmplifyForgotPassword>
          </AmplifyAuthContainer>
        </div>
      </div>
    </div>
  );
}

Signup.propTypes = {
  location: PropTypes.object,
};

export default Signup;
