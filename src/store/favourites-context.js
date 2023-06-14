import { createContext, useEffect, useState } from "react";

const FavouritesContext = createContext({
  favouritePokemons: [],
  totalFavourites: 0,
  addFavourite: (pokemon) => {},
  removeFavourite: (pokId) => {},
  pokemonIsFavourite: (pokId) => {},
});

export const FavouritesContextProvider = (props) => {
  const [favouritePokemon, setFavouritePokemon] = useState(() => {
    const initFavouritePokemon = JSON.parse(localStorage.getItem("pokemons"));
    return initFavouritePokemon || [];
  });

  useEffect(() => {
    localStorage.setItem("pokemons", JSON.stringify(favouritePokemon));
  }, [favouritePokemon]);

  const addFavouriteHandler = (pokemon) => {
    setFavouritePokemon((prevState) => {
      return prevState.concat(pokemon);
    });
  };

  const removeFavouriteHandler = (pokId) => {
    setFavouritePokemon((prevState) => {
      return prevState.filter((p) => p.id !== pokId);
    });
  };

  const isFavouritePokemon = (pokId) => {
    return favouritePokemon.some((p) => p.id === pokId);
  };

  const context = {
    favouritePokemons: favouritePokemon,
    totalFavourites: favouritePokemon.length,
    addFavourite: addFavouriteHandler,
    removeFavourite: removeFavouriteHandler,
    pokemonIsFavourite: isFavouritePokemon,
  };

  return (
    <FavouritesContext.Provider value={context}>
      {props.children}
    </FavouritesContext.Provider>
  );
};

export default FavouritesContext;
