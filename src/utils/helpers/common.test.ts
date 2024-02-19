import { generatePerPageOptions, getURLParamsObject } from './common';
import { IPokemonListParams } from '../../typescript/entities';
import { ISelectOption } from 'components/common/CommonSelect/CommonSelect';

describe('getURLParamsObject', () => {
  it('should work properly', () => {
    const result = getURLParamsObject('offset=0&limit=12&param-x=123');

    const expectedResult: IPokemonListParams = {
      offset: 0,
      limit: 12,
      'param-x': '123',
    };

    expect(result).toEqual(expectedResult);
  });
});

describe('generatePerPageOptions', () => {
  it('should work properly', () => {
    const result = generatePerPageOptions([1, 2, 3]);

    const expectedResult: ISelectOption<number>[] = [
      {
        label: '1',
        value: 1,
      },
      {
        label: '2',
        value: 2,
      },
      {
        label: '3',
        value: 3,
      },
    ];

    expect(result).toEqual(expectedResult);
  });
});
