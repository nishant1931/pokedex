import React, { useEffect, useState } from "react";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import PokemonList from "../../components/PokemonList/PokemonList";
// import Card from "../../components/Card/Card";
import "./style.css";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import Searchbar from "../../components/Searchbar/Searchbar";
import PokemonLists from "../../components/PokemonLists/PokemonLists";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  // const [prevUrl, setPrevUrl] = useState("");
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);

  const limit = 10;

  function getAllPokemon() {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
      .then((res) => res.json())
      .then(async (data) => {
        setNextUrl(data.next);
        await loadingPokemon(data.results);
        setIsLoading(false);
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsFetching(false);
        setIsError("Something went wrong! Please try again later");
      });
  }

  useEffect(() => {
    getAllPokemon();
  }, [offset]);

  // const fetchMorePokemonData = async () => {
  //   console.log("FETCHING MORE DATA");
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch(
  //       `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  //     );
  //     const data = await res.json();
  //     await loadingPokemon(data.results);
  //     setOffset((prev) => prev + 10);
  //     setIsLoading(false);
  //     setIsFetching(false);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // };

  function isScrolling() {
    // console.log("ScrollHeight", document.documentElement.scrollHeight);
    // console.log("innerHeight", window.innerHeight);
    // console.log("scrollTop", document.documentElement.scrollTop);
    // if (!nextUrl) return;
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setOffset((prev) => prev + 10);
      setIsFetching(true);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, []);

  const loadingPokemon = async (data) => {
    // console.log("DDDDD", data);
    try {
      let _pokemon = await Promise.all(
        data.map(async (pokemon) => {
          let pokemonRecord = await fetch(pokemon.url);
          let pokemonRecordData = await pokemonRecord.json();
          return pokemonRecordData;
        })
      );

      setPokemonData([...pokemonData, ..._pokemon]);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="home_section">
        {isError && (
          <ContentWrapper>
            <ErrorMessage>{isError}</ErrorMessage>
          </ContentWrapper>
        )}
        {isLoading && !isFetching ? (
          <LoadingSpinner />
        ) : (
          <>
            <ContentWrapper>
              <Searchbar />
              <PokemonLists pokemonData={pokemonData} />
            </ContentWrapper>
          </>
        )}
        {isFetching && <LoadingSpinner />}
      </div>
      {/* {isFetching && <LoadingSpinner />} */}
    </>
  );
};

export default HomePage;
