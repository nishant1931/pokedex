import React from "react";

import "./PageNotFound.css";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";

const PageNotFound = () => {
  return (
    <div className="page_not_found">
      <span className="big_text">404</span>
      <span className="small_text">Page not found!</span>
    </div>
  );
};

export default PageNotFound;
