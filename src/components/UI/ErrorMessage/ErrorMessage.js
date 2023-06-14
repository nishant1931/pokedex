import React from "react";
import "./ErrorMessage.css";

const ErrorMessage = (props) => {
  return <div className="error">{props.children}</div>;
};

export default ErrorMessage;
