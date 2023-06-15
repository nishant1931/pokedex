import React, { useEffect, useState } from "react";
import { pokemonTypes } from "../../pokemonTypes";
import "./Filter.css";

const Filter = ({ fetchFilter, type, handleClose }) => {
  const [{ name, color }] = pokemonTypes.filter((item) => item.name === type);

  return (
    <button
      className="filter-button"
      onClick={() => {
        handleClose();
        fetchFilter(`${name}`);
      }}
      style={{ backgroundColor: `${color}` }}
    >
      {name}
    </button>
  );
};
export default Filter;
