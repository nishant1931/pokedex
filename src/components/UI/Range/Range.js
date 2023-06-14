import React from "react";
import "./Range.css";

const Range = ({ value = 50, max = 100 }) => {
  const percent = (parseInt(value) / parseInt(max)) * 100;
  const colorClass = percent >= 50 ? "range-positive" : "range-negative";

  return (
    <div
      className={`range ${colorClass}`}
      style={{ "--percent": `${percent}%` }}
    />
  );
};

export default Range;
