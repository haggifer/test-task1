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

export interface IPokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbility[];
  forms: NamedAPIResource[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  past_types: PokemonTypePast[];
  sprites: PokemonSprites;
  species: NamedAPIResource;
  stats: PokemonStat[];
  types: PokemonType[];
}

interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

interface PokemonAbility {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

interface PokemonHeldItem {
  item: NamedAPIResource;
  version_details: PokemonHeldItemVersion[];
}

interface PokemonHeldItemVersion {
  version: NamedAPIResource;
  rarity: number;
}

interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: PokemonMoveVersion[];
}

interface PokemonMoveVersion {
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
  level_learned_at: number;
}

interface PokemonStat {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
}

interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

interface PokemonFormType {
  slot: number;
  type: NamedAPIResource;
}

interface PokemonTypePast {
  generation: NamedAPIResource;
  types: PokemonType[];
}

interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string;
  back_shiny: string;
  back_female: string | null;
  back_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string;
      front_female: string | null;
    },
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    },
    'official-artwork': {
      front_default: string | null;
      front_shiny: string | null;
    },
  }
}

/*---------------------------------------*/

export interface IPokemonListParams {
  limit: number;
  offset: number;
  search?: string,
  generation?: string;
  type?: string;
  ability?: string;
  habitat?: string;
  color?: string;
  shape?: string;
  sort?: string;
  language?: string;

  [key: string]: string | number | undefined,
}

export interface IPokemonList {
  count: number,
  results: IPokemonForm[],
}

/*---------------------------------------*/

export interface IPokemonType {
  id: number;
  name: string;
  damage_relations: TypeRelations;
  past_damage_relations: TypeRelationsPast[];
  game_indices: GenerationGameIndex[];
  generation: NamedAPIResource;
  move_damage_class: NamedAPIResource;
  names: Name[];
  pokemon: TypePokemon[];
  moves: NamedAPIResource[];
}

interface TypePokemon {
  slot: number;
  pokemon: NamedAPIResource;
}

interface TypeRelations {
  no_damage_to: NamedAPIResource[];
  half_damage_to: NamedAPIResource[];
  double_damage_to: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  double_damage_from: NamedAPIResource[];
}

interface TypeRelationsPast {
  generation: NamedAPIResource;
  damage_relations: TypeRelations;
}

interface GenerationGameIndex {
  game_index: number;
  generation: NamedAPIResource;
}

/*---------------------------------------*/

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