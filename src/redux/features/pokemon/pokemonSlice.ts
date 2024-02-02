import { IPokemonState } from '../../../typescript/states';
import { createSlice } from '@reduxjs/toolkit';
import { getPokemon, getPokemonList, getPokemonTypes } from './pokemonThunks';
import { ISerializableError } from '../../../api/api';

const initialState: IPokemonState = {
  list: null,
  types: null,
  current: null,
  error: null,
};

export const pokemonSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPokemonList.pending, (state) => {
        state.error = null;
      })
      .addCase(getPokemonList.fulfilled, (state, { payload }) => {
        state.list = payload;
      })
      .addCase(getPokemonList.rejected, () => {})

      .addCase(getPokemonTypes.pending, () => {})
      .addCase(getPokemonTypes.fulfilled, (state, { payload }) => {
        state.types = payload;
      })
      .addCase(getPokemonTypes.rejected, () => {})

      .addCase(getPokemon.pending, (state) => {
        state.error = null;
      })
      .addCase(getPokemon.fulfilled, (state, { payload }) => {
        state.current = payload;
      })
      .addCase(getPokemon.rejected, (state, { payload }) => {
        state.error = payload as ISerializableError;
      });
  },
});

export const {} = pokemonSlice.actions;
