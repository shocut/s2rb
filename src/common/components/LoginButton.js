import Button from "./Button.js";

function LoginButton({ onLogout, classes }) {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser) {
    return (
      <Button
        color="transparent"
        onClick={onLogout}
        target="_blank"
        className={classes.navLink}
      >
        Sign out
      </Button>
    );
  } else {
    return (
      <Button
        color="transparent"
        href="/signup"
        target="_self"
        className={classes.navLink}
      >
        Sign in
      </Button>
    );
  }
}
export default LoginButton;
