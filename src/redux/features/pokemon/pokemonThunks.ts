import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IPokemon,
  IPokemonForm,
  IPokemonList,
  IPokemonListParams,
  IPokemonType,
  NamedAPIResource,
  NamedAPIResourceList
} from "../../../typescript/entities";
import { apiProvider, ISerializableError } from "../../../api/api";
import { RootState } from "../../store";

export const defaultListLength = 12;

export const getPokemonList = createAsyncThunk<IPokemonList, IPokemonListParams>(
  'pokemon/getList',
  async (params, { rejectWithValue, dispatch, getState }) => {
    try {
      await dispatch(getPokemonTypes())

      let count = 0;
      let pokemonAPIResourceResults: NamedAPIResource[] = [];

      if (params.type) {
        const state = getState() as RootState
        const targetType = (state.pokemon.types as IPokemonType[]).find(type => type.name === params.type)

        if (!targetType) {
          pokemonAPIResourceResults = []
        } else {
          pokemonAPIResourceResults = targetType.pokemon.map(pokemon => pokemon.pokemon)

          if (params.search) {
            const regex = new RegExp(params.search, "gi");

            pokemonAPIResourceResults = pokemonAPIResourceResults.filter(result => result.name.match(regex))
          }

          count = pokemonAPIResourceResults.length

          pokemonAPIResourceResults = pokemonAPIResourceResults.slice(
            params.offset,
            params.offset + params.limit
          )
        }
      } else {
        if (!params.search) {
          const response = await apiProvider.request<NamedAPIResourceList>({
            method: 'get',
            url: `/pokemon`,
            headers: {
              'Content-Type': 'application/json',
            },
            params,
          })

          count = response.data.count

          pokemonAPIResourceResults = response.data.results
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

          pokemonAPIResourceResults = response.data.results
            .filter(item => item.name.includes(params.search as string))

          count = pokemonAPIResourceResults.length

          pokemonAPIResourceResults = pokemonAPIResourceResults.slice(
            params.offset,
            params.offset + params.limit
          )
        }
      }

      const pokemonFormResponses = (await Promise.all(
        pokemonAPIResourceResults.map(result => apiProvider.request<IPokemonForm>({
          method: 'get',
          url: `/pokemon-form/${result.url.split('/').slice(-2).join('/')}`,
          headers: {
            'Content-Type': 'application/json',
          },
        }))
      ))

      const pokemonFormResults = pokemonFormResponses.map(result => result.data)

      return {
        count: count,
        results: pokemonFormResults,
      }
    } catch
      (err) {
      return rejectWithValue(err)
    }
  }
)

export const getPokemonTypes = createAsyncThunk<IPokemonType[], undefined>(
  'pokemon/getTypes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiProvider.request<NamedAPIResourceList>({
        method: 'get',
        url: `/type`,
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          limit: 1000,
        },
      })

      const pokemonFormResponses = (await Promise.all(
        response.data.results.map(item => apiProvider.request<IPokemonType>({
          method: 'get',
          url: `/type/${item.name}`,
          headers: {
            'Content-Type': 'application/json',
          },
        }))
      ))

      return pokemonFormResponses.map(result => result.data)
    } catch (err) {
      return rejectWithValue(err)
    }
  }
)

export const getPokemon = createAsyncThunk<IPokemon, number>(
  'pokemon/getDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiProvider.request<IPokemon>({
        method: 'get',
        url: `/pokemon/${id}`,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return response.data
    } catch (err) {
      return rejectWithValue(err as ISerializableError)
    }
  }
)