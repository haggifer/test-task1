import { IPokemonListParams } from '../../typescript/entities';

export const getURLParamsObject = (url: string): IPokemonListParams => {
  const searchParams = new URLSearchParams(url);

  const paramsObject: Record<string, string | number> = {};

  for (const [key, value] of searchParams) {
    if (key === 'limit' || key === 'offset') {
      paramsObject[key] = Number(value);
    } else {
      paramsObject[key] = value;
    }
  }

  return paramsObject as IPokemonListParams;
};
