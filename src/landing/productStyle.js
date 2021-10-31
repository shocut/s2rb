import { title } from "../common/jss/baseStyles.js";

const productStyle = {
  section: {
    padding: "70px 0",
    textAlign: "center",
  },
  title: {
    ...title,
    marginBottom: "1rem",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
  },
  description: {
    color: "#999",
  },
  darkbg: {
    background: "#fbfbfb",
    padding: "10px",
  },
};

export default productStyle;
