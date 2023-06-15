import React, { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import { BsBookmark } from "react-icons/bs";
import { BsBookmarkFill } from "react-icons/bs";
import ContentWrapper from "../../components/ContentWrapper/ContentWrapper";
import { useState } from "react";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import About from "../../components/UI/About/About";
import Stats from "../../components/UI/Stats/Stats";
import FavouritesContext from "../../store/favourites-context";
import ErrorMessage from "../../components/UI/ErrorMessage/ErrorMessage";

const TAB_ABOUT = "about";
const TAB_STATS = "base-stats";
const TAB_DEFAULT = TAB_ABOUT;

const tabs = [
  {
    id: TAB_ABOUT,
    label: "About",
  },
  {
    id: TAB_STATS,
    label: "Base Stats",
  },
];

const PokemonDetail = () => {
  const [pokemonDetail, setPokemonDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentTab, setCurrentTab] = useState(TAB_DEFAULT);
  const { id } = useParams();

  // const { state } = useLocation();

  // console.log("SSSSSSSSS", state);

  // console.log("PPPOOOO", pokemonDetail);

  const favouriteCtx = useContext(FavouritesContext);
  const pokemonId = pokemonDetail?.id;

  const pokemonIsFavourite = favouriteCtx.pokemonIsFavourite(pokemonId);

  let padNumber =
    pokemonDetail?.id < 999
      ? `000${pokemonDetail?.id}`.slice(-4)
      : `${pokemonDetail?.id}`;

  const toggleFavouriteHandler = () => {
    if (pokemonIsFavourite) {
      favouriteCtx.removeFavourite(pokemonId);
    } else {
      favouriteCtx.addFavourite(pokemonDetail);
    }
  };

  useEffect(() => {
    async function getPokemonDetail() {
      setIsLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!response.ok) {
          throw new Error("Sorry, The Pokemon you are looking not found!!");
        }

        const data = await response.json();

        setPokemonDetail(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setErrorMessage(error.message);
      }
    }

    getPokemonDetail();
  }, [id]);

  // TAB SWITCH CLASS NAME
  const getClassName = (tabName) => {
    return `tab-switch ${currentTab === tabName ? "active" : ""}`;
  };

  const classNameColor = pokemonDetail?.types
    ?.map(({ type }) => "type-" + type.name)
    .join(" ");

  if (errorMessage) {
    return (
      <div style={{ paddingTop: "70px" }}>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "60px" }}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <div className={`pokemon_detail ${classNameColor}`}>
            <ContentWrapper>
              <div className="pok_name">
                <div className="pok-name_desc">
                  <h2>
                    {pokemonDetail?.name}{" "}
                    <span
                      style={{ color: "#eee", fontWeight: "400" }}
                    >{`(#${padNumber})`}</span>{" "}
                  </h2>
                  <div className="pok_types">
                    {pokemonDetail?.types?.map((type) => (
                      <p className="pok_type" key={type.slot}>
                        {type?.type?.name}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="book_icon" onClick={toggleFavouriteHandler}>
                  {pokemonIsFavourite ? <BsBookmarkFill /> : <BsBookmark />}
                </div>
              </div>
              <div className="pok_image">
                {pokemonDetail && (
                  <img src={pokemonDetail?.sprites?.front_default} />
                )}
              </div>
            </ContentWrapper>
          </div>
          <ContentWrapper>
            <div className="tab_container">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  className={getClassName(id)}
                  onClick={() => setCurrentTab(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            {(() => {
              switch (currentTab) {
                case TAB_ABOUT:
                  return <About pokemon={pokemonDetail} />;

                case TAB_STATS:
                  return <Stats stats={pokemonDetail?.stats} />;

                default:
                  return null;
              }
            })()}
          </ContentWrapper>
        </>
      )}
    </div>
  );
};

export default PokemonDetail;
