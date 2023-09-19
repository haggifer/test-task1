import { IPokemonState } from "../../../typescript/states";
import { createSlice } from "@reduxjs/toolkit";
import { getPokemon, getPokemonList, getPokemonTypes } from "./pokemonThunks";

const initialState: IPokemonState = {
  list: null,
  types: null,
  current: null,
}

export const pokemonSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getPokemonList.pending, () => {
      })
      .addCase(getPokemonList.fulfilled, (state, { payload }) => {
        state.list = payload
      })
      .addCase(getPokemonList.rejected, () => {
      })

      .addCase(getPokemonTypes.pending, () => {
      })
      .addCase(getPokemonTypes.fulfilled, (state, { payload }) => {
        state.types = payload
      })
      .addCase(getPokemonTypes.rejected, () => {
      })

      .addCase(getPokemon.pending, () => {
      })
      .addCase(getPokemon.fulfilled, (state, { payload }) => {
        state.current = payload
      })
      .addCase(getPokemon.rejected, () => {
      })
  }
})

export const {} = pokemonSlice.actions