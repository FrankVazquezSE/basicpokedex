import React, { useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokemonData] = useState([]);
  const [pokemonType, setPokemonType] = useState("");
  const [pokemonHp, setPokemonHp] = useState("");
  const [pokemonAttack, setPokemonAttack] = useState("");
  const [pokemonDefense, setpokemonDefense] = useState("");
  const [pokemonAbility, setpokemonAbility] = useState("");

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };
  const getPokemon = async () => {
    const toArray = [];
    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType(res.data.types[0].type.name);
      setPokemonHp(res.data.stats[0].base_stat);
      setPokemonAttack(res.data.stats[1].base_stat);
      setpokemonDefense(res.data.stats[2].base_stat);
      setpokemonAbility(res.data.abilities[1].ability.name);
      setPokemonData(toArray);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(pokemonData);

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="enter pokemon name"
          />
        </label>
      </form>
      {/* <ul>{pokemonData}</ul> */}
      {/* <p>{[pokemonData]}</p> */}
      {pokemonData.map((data) => {
        return (
          <div className="container">
            <img src={data.sprites["front_default"]} />
            <div className="divTable">
              <div className="divTableBody">
                <div className="divTableRow">
                  <div className="divTableCell">Type</div>
                  <div className="divTableCell">{pokemonType}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Height</div>
                  <div className="divTableCell">
                    {" "}
                    {Math.round(data.height * 3.9)}"
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Weight</div>
                  <div className="divTableCell">
                    {" "}
                    {Math.round(data.weight / 4.3)} lbs
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">HP</div>
                  <div className="divTableCell">
                  {pokemonHp}
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Attack</div>
                  <div className="divTableCell">
                    {pokemonAttack}
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Defense</div>
                  <div className="divTableCell">
                    {pokemonDefense}
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Ability</div>
                  <div className="divTableCell">
                    {pokemonAbility}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default App;
