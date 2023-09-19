import { IPokemon, IPokemonList, IPokemonType } from "./entities";

export interface IPokemonState {
  list: IPokemonList | null,
  types: IPokemonType[] | null,
  current: IPokemon | null,
}

/*---------------------------------------*/