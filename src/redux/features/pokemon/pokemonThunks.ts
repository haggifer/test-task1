import { createAsyncThunk } from "@reduxjs/toolkit";
import { IPokemonListParams } from "../../../typescript/api";
import { apiProvider } from "../../../api/api";
import { IPokemonForm, IPokemonList, NamedAPIResourceList } from "../../../typescript/entities";
import _ from 'lodash'

export const defaultListLength = 12;

export const getPokemonList = createAsyncThunk<IPokemonList, IPokemonListParams>(
  'pokemon/getList',
  async (params, { rejectWithValue }) => {
    try {
      let responseData: NamedAPIResourceList;

      if (!params.name) {
        const response = await apiProvider.request<NamedAPIResourceList>({
          method: 'get',
          url: `/pokemon`,
          headers: {
            'Content-Type': 'application/json',
          },
          params: _.omit(params),
        })

        responseData = response.data
      } else {
        const response = await apiProvider.request<NamedAPIResourceList>({
          method: 'get',
          url: `/pokemon`,
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            ...params,
            limit: 10000,
          },
        })

        responseData = {
          ...response.data,
          results: response.data.results
            .filter(item => item.name.includes(params.name as string))
            .slice(0, params.limit || defaultListLength)
        }
      }

      const pokemonFormResponses = (await Promise.all(
        responseData.results.map(item => apiProvider.request<IPokemonForm>({
          method: 'get',
          url: `/pokemon-form/${item.name}`,
          headers: {
            'Content-Type': 'application/json',
          },
        }))
      ))

      const pokemonFormResults = pokemonFormResponses.map(result => result.data)

      return {
        ...responseData,
        results: pokemonFormResults,
      }
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)