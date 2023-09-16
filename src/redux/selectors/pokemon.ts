import { RootState } from "../store";

export const selectPokemon = (state: RootState) => state.pokemon;
export const selectPokemonList = (state: RootState) => state.pokemon.listResponse;
export const selectPokemonCurrent = (state: RootState) => state.pokemon.current;