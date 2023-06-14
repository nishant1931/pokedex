import React, { useEffect, useState } from "react";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import PokemonDetail from "./pages/PokemonDetail/PokemonDetail";
import Favourites from "./pages/Favourites/Favourites";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/pokemon/:id" element={<PokemonDetail />} />
        <Route exact path="/your-pokemons" element={<Favourites />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
