export interface IPokemonListParams {
  name?: string,
  limit?: number;
  offset?: number;
  generation?: number;
  type?: string;
  ability?: string;
  habitat?: string;
  color?: string;
  shape?: string;
  sort?: string;
  language?: string;

  [key: string]: string | number | undefined,
}