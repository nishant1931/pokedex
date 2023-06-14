import React from "react";
import PokemonList from "../PokemonList/PokemonList";

const PokemonLists = ({ pokemonData }) => {
  return (
    <div className="card_container">
      {pokemonData?.map((pokemon, index) => (
        <PokemonList key={index} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonLists;
