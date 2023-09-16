import { IPokemonState } from "../../../typescript/states";
import { createSlice } from "@reduxjs/toolkit";
import { getPokemonList } from "./pokemonThunks";

const initialState: IPokemonState = {
  listResponse: null,
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
        state.listResponse = payload
      })
      .addCase(getPokemonList.rejected, () => {
      })
  }
})

export const {} = pokemonSlice.actions