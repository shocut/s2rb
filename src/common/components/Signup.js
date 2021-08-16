import React from "react";
import queryString from "query-string";
import { Auth } from "aws-amplify";
import { AuthState } from "@aws-amplify/ui-components";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import {
  AmplifySignUp,
  AmplifyAuthenticator,
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
  const queryValues = queryString.parse(props.location.search);
  console.log(queryValues.ref);
  var nextPage = "/home";
  if (queryValues.ref) {
    //need a better check to make sure we don't route to any page
    nextPage = queryValues.ref;
  }

  const checkLoginState = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      if (currentUser) {
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
    console.log("onAuthStateChange: " + nextAuthState);

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
          <AmplifyAuthContainer>
            <AmplifyAuthenticator
              usernameAlias="email"
              handleAuthStateChange={onAuthStateChange}
            >
              <AmplifySignUp
                slot="sign-up"
                usernameAlias="email"
                headerText="Sign Up for S2RB"
                formFields={[
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
                  },
                ]}
              />
              <AmplifySignIn
                slot="sign-in"
                usernameAlias="email"
                headerText="Sign In to S2RB"
              />
            </AmplifyAuthenticator>
          </AmplifyAuthContainer>
        </div>
      </div>
    </div>
  );
}

export default Signup;
