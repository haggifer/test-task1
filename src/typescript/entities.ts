export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface NamedAPIResourceList {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedAPIResource[];
}

/*---------------------------------------*/

interface PokemonFormType {
  slot: number;
  type: NamedAPIResource;
}

interface PokemonFormSprites {
  front_default: string;
  front_shiny: string;
  back_default: string;
  back_shiny: string;
}

interface Name {
  name: string;
  language: NamedAPIResource;
}

export interface IPokemonForm {
  id: number;
  name: string;
  order: number;
  form_order: number;
  is_default: boolean;
  is_battle_only: boolean;
  is_mega: boolean;
  form_name: string;
  pokemon: NamedAPIResource;
  types: PokemonFormType[];
  sprites: PokemonFormSprites;
  version_group: NamedAPIResource;
  names: Name[];
  form_names: Name[];
}

export interface IPokemonList extends Omit<NamedAPIResourceList, 'results'> {
  results: IPokemonForm[],
}