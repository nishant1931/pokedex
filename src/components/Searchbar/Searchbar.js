import React, { useState } from "react";
import "./Searchbar.css";
import { useNavigate } from "react-router-dom";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (query) {
      navigate(`/pokemon/${query}`);
    }
  };

  return (
    <div className="searchbar">
      <form className="searchInput" onSubmit={submitHandler}>
        <input
          autoFocus
          type="text"
          placeholder="Search for a pokemon"
          onChange={(e) => setQuery(e.target.value)}
        />
        {/* <VscChromeClose onClick={() => setShowSearch(false)} /> */}
      </form>
    </div>
  );
};

export default Searchbar;
