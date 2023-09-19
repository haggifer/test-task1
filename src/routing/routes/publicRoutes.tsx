import { RouteObject } from "react-router-dom";
import React from "react";
import PokemonList from "../../pages/public/Pokemon/PokemonList";
import PageLayout from "../../components/layout/PageLayout/PageLayout";
import PokemonDetails from "pages/public/Pokemon/PokemonDetails";

export const defaultPublicPath = '/pokemon';

export const publicRoutes: RouteObject[] = [
  {
    element: (
      <PageLayout/>
    ),
    children: [
      {
        path: '/',
        element: (
          <PokemonList/>
        ),
      },
      {
        path: '/pokemon',
        element: (
          <PokemonList/>
        ),
      },
      {
        path: '/pokemon/:id',
        element: (
          <PokemonDetails/>
        ),
      },
    ],
  },
]