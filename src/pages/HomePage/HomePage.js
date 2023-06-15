import React, { useEffect, useState } from "react";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import PokemonList from "../../components/PokemonList/PokemonList";
// import Card from "../../components/Card/Card";
import "./style.css";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import Searchbar from "../../components/Searchbar/Searchbar";
import PokemonLists from "../../components/PokemonLists/PokemonLists";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";
import Filter from "../../components/Filter/Filter";
import { Button, Fade, Menu } from "@mui/material";
import { pokemonTypes } from "../../pokemonTypes";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  // const [prevUrl, setPrevUrl] = useState("");
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const limit = 10;

  const [filtered, setFiltered] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
      window.innerHeight + document.documentElement.scrollTop + 10 >=
      document.documentElement.scrollHeight
    ) {
      setOffset((prev) => prev + 10);
      setIsFetching(true);
    }
  }

  const fetchFilter = async (value) => {
    if (value) {
      try {
        setIsLoading(true);
        const response = await fetch(`https://pokeapi.co/api/v2/type/${value}`);
        const data = await response.json();
        const filteredPokemon = data.pokemon;
        filteredPokemon.map(async (item) => {
          // slice out alternate forms and megas
          if (
            item.pokemon.url
              .slice("-6")
              .replace(/\D/g, "")
              .replaceAll("/", "") < 10000
          ) {
            setPokemonData([]);
            const againResponse = await fetch(item.pokemon.url);
            if (!againResponse.ok) {
              throw new Error("Filter not applied. Please try again later.");
            }
            const againData = await againResponse.json();
            setPokemonData((state) => {
              state = [...state, againData];
              state.sort((a, b) => (a.id > b.id ? 1 : -1));
              return state;
            });
          }
        });

        setFiltered(true);
        setIsLoading(false);
      } catch (e) {
        console.log(e.message);
        setIsLoading(false);
        setIsError(e.message);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", isScrolling);
    return () => window.removeEventListener("scroll", isScrolling);
  }, []);

  const loadingPokemon = async (data) => {
    try {
      let _pokemon = await Promise.all(
        data.map(async (pokemon) => {
          let pokemonRecord = await fetch(pokemon.url);
          let pokemonRecordData = await pokemonRecord.json();

          // setPokemonData((state) => {
          //   state = [...state, _pokemon];
          //   state.sort((a, b) => (a.id > b.id ? 1 : -1));
          //   return state;
          // });
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
              <div className="utils">
                <Searchbar />
                <Button
                  className="filter-type"
                  id="fade-button"
                  aria-controls={open ? "fade-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  variant="contained"
                >
                  Filter by Type
                </Button>

                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  TransitionComponent={Fade}
                >
                  {pokemonTypes.map(({ name }, i) => {
                    return (
                      <Filter
                        key={i}
                        fetchFilter={fetchFilter}
                        type={name}
                        handleClose={handleClose}
                      />
                    );
                  })}
                </Menu>
              </div>
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
