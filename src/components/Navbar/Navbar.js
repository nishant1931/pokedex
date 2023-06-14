import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContentWrapper from "../ContentWrapper/ContentWrapper";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header className="header">
      <ContentWrapper>
        <div className="logo">
          <Link to="/">
            <h1> Pokedex </h1>
          </Link>
        </div>

        <nav className="nav_items">
          <ul className="menu_items">
            <li className="menu_item">
              <Link to="/your-pokemons">Your Pokemons</Link>
            </li>
          </ul>
        </nav>
      </ContentWrapper>

      {/* <div className="searchBar">
        <ContentWrapper>
         
        </ContentWrapper>
      </div> */}
    </header>
  );
};

export default Navbar;
