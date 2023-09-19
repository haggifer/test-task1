import { RootState } from "../store";

export const selectPokemon = (state: RootState) => state.pokemon;
export const selectPokemonList = (state: RootState) => state.pokemon.list;
export const selectPokemonTypes = (state: RootState) => state.pokemon.types;
export const selectPokemonCurrent = (state: RootState) => state.pokemon.current;