import { IPokemon, IPokemonList, IPokemonType } from './entities';
import { ISerializableError } from '../api/api';

export interface IPokemonState {
  list: IPokemonList | null;
  types: IPokemonType[] | null;
  current: IPokemon | null;
  error: ISerializableError | null;
}

/*---------------------------------------*/
