import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="App" role="alert">
      <p>Oops! Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.string,
  resetErrorBoundary: PropTypes.object,
};

export default ErrorFallback;
