import { ISelectOption } from 'typescript/common';
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

export const generatePerPageOptions = (
  values: number[],
): ISelectOption<number>[] => {
  return values.map((value) => ({
    label: String(value),
    value,
  }));
};