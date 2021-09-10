import { container, title } from "../common/jss/baseStyles.js";
const sellerProfileStyle = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container,
  },
  section: {
    padding: "40px 0",
    marginLeft: "5px",
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
    margin: "10px auto 0",
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    minHeight: "300px",
    zIndex: "3",
  },
  mainRaised: {
    width: "100%",
    zIndex: "12",
    margin: "-20px 10px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  questionPanel: {
    width: "100%",
    padding: "40px 0",
    marginLeft: "10px",
  },
  label: {
    letterSpacing: "0.03333em",
    lineHeight: 1.66,
  },
  sliderContainer: {
    width: "500px",
    height: "100px",
  },
};
export default sellerProfileStyle;
