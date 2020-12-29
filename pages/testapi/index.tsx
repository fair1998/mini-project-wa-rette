import { FunctionComponent, useEffect, useState } from "react";
import Axios from "axios";

// interface Pokemon {
//   name: string;
//   url: string;
//   image: string;
// }

const TestAPI: FunctionComponent = () => {
  // const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  function test() {
    const res = Axios.post("https://roulette.ap.ngrok.io/users", {
      username: "username",
      password: "password",
    });
    console.log(res);
  }

  // const onLoad = async () => {
  //   const { data } = await Axios.get(
  //     "https:pokeapi.co/api/v2/pokemon?limit=10"
  //   );
  //   for (const result of data.results) {
  //     const pokemon = data.results.find((p: Pokemon) => p.name === result.name);
  //     const { data: pokemonInfo } = await Axios.get(pokemon.url);
  //     pokemon.image =
  //       pokemonInfo.sprites.other["official-artwork"]["front_default"];
  //   }
  //   setPokemon(data.results);
  // };
  // console.log("ss", pokemon);
  // useEffect(() => {
  //   onLoad();
  // }, []);
  return (
    <div>
      <button onClick={test}>Click</button>
    </div>
  );
};

export default TestAPI;
