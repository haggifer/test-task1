import { RouteObject } from "react-router-dom";
import React from "react";
import PokemonList from "../../pages/public/PokemonList/PokemonList";

export const defaultPublicPath = '/list';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <PokemonList/>
    ),
  },
  {
    path: '/pokemon-list',
    element: (
      <PokemonList/>
    ),
  },
]