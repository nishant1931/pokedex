import React, { useContext, useEffect } from "react";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import FavouritesContext from "../../store/favourites-context";
import PokemonLists from "../../components/PokemonLists/PokemonLists";

const Favourites = () => {
  const favouriteCtx = useContext(FavouritesContext);

  let content;
  if (favouriteCtx.favouritePokemons.length === 0) {
    content = (
      <p style={{ textAlign: "center", marginTop: "40px" }}>
        You do not have any pokemons. Add some pokemons!!
      </p>
    );
  } else {
    content = <PokemonLists pokemonData={favouriteCtx.favouritePokemons} />;
  }

  return (
    <section style={{ paddingTop: "70px" }}>
      <ContentWrapper>
        <h1>Your Pokemons</h1>
        {content}
      </ContentWrapper>
    </section>
  );
};

export default Favourites;
