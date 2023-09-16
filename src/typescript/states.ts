import { IPokemonForm, IPokemonList } from "./entities";

export interface IPokemonState {
  listResponse: IPokemonList | null,
  current: IPokemonForm | null,
}

/*---------------------------------------*/