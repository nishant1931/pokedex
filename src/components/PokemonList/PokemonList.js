import React from "react";
import { useNavigate } from "react-router-dom";
import "./PokemonList.css";

const PokemonList = ({ pokemon }) => {
  const navigate = useNavigate();

  const classNameColor = pokemon?.types
    ?.map(({ type }) => "type-" + type.name)
    .join(" ");

  const pokemonDetailHandler = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon?.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          navigate(`/pokemon/${data?.id}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let padNumber =
    pokemon?.id < 999 ? `000${pokemon?.id}`.slice(-4) : `${pokemon?.id}`;

  return (
    <div className={`card ${classNameColor}`} onClick={pokemonDetailHandler}>
      <span className="pok_id">{`#${padNumber}`}</span>
      <div className="card_img">
        <img src={pokemon?.sprites?.front_default} />
      </div>
      <div className="card_name">
        <p className="pok_name">{pokemon?.name}</p>
        <div className="card_types">
          {pokemon?.types?.map((type) => (
            <p className="pok_type" key={type.type.name}>
              {type?.type?.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonList;
