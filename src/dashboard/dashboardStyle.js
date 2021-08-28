import { container, title } from "../common/jss/baseStyles.js";

const timelineStyle = {
  container: {
    zIndex: "12",
    color: "black",
    height: "100%",
    ...container,
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    fontWeight: "500",
    color: "#FFFFFF",
    textDecoration: "none",
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    minHeight: "500px",
    zIndex: "3",
  },
  mainRaised: {
    margin: "-7px 10px 0px",
    height: "100%",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  chronoTimeline: {
    fontFamily: "Nunito sans-serif",
    textAlign: "center",
  },
  center: {
    margin: "auto",
    width: "100%",
  },
  section: {
    padding: "10px 0",
    margin: "3px",
  },
  avatar: {
    border: "solid 2px",
    padding: "32px",
    fontSize: "48px",
    backgroundColor: "#f4f4f5",
  },
  dashCard: {
    minHeight: "200px",
  },
};

export default timelineStyle;
