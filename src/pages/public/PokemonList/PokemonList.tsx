import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { Box, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { selectPokemonList } from "../../../redux/selectors/pokemon";
import { useEffectOnce } from "../../../utils/hooks/useEffectOnce";
import { defaultListLength, getPokemonList } from "../../../redux/features/pokemon/pokemonThunks";
import classes from './PokemonList.module.scss'
import globalClasses from 'assets/scss/globalClasses.module.scss'
import classNames from "classnames";
import CustomProgress from "../../../components/common/CustomProgress/CustomProgress";
import _ from 'lodash'
import { useLocation, useNavigate } from "react-router-dom";
import { getURLParamsInstance, getURLParamsObject } from "../../../utils/helpers/common";
import { IPokemonListParams } from "../../../typescript/api";

export default function PokemonList(): ReactElement {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()

  const pokemonList = useAppSelector(selectPokemonList)

  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))
  const isSm = useMediaQuery(theme.breakpoints.only('sm'))
  const isMd = useMediaQuery(theme.breakpoints.only('md'))
  const upLg = useMediaQuery(theme.breakpoints.up('lg'))

  const [searchValue, setSearchValue] = useState<string>('')
  const [searchLoading, setSearchLoading] = useState<boolean>(false)

  const getNewURLParamsObject = (searchValue: string): IPokemonListParams => {
    const paramsObject = getURLParamsObject(location.search)

    const newParams: IPokemonListParams = {
      limit: defaultListLength,
      ...paramsObject,
    }

    if (searchValue) {
      newParams.name = searchValue
    }

    return newParams
  }

  const runSearch = useCallback(async (searchValue: string) => {
    const newParams = getNewURLParamsObject(searchValue)

    setSearchLoading(true)

    await dispatch(getPokemonList(newParams as IPokemonListParams))

    setSearchLoading(false)

    const newSearch = getURLParamsInstance(newParams).toString()

    navigate({ pathname: location.pathname, search: newSearch });
  }, [])

  const debouncedSetSearchValue = useMemo(() => {
    return _.debounce(runSearch, 300)
  }, [])

  useEffect(() => {
    debouncedSetSearchValue(searchValue)
  }, [searchValue])

  useEffectOnce(() => {
    const paramsObject = getURLParamsObject(location.search)

    dispatch(getPokemonList({
      limit: defaultListLength,
      ...paramsObject,
    }))

    if (paramsObject.name) {
      setSearchValue(paramsObject.name)
    }
  })

  return (
    <>
      <Typography variant="h2" component="h1" className={globalClasses.page_title}>Pokemon list</Typography>

      <Box className={classes.filters}>
        <TextField
          className={classes.search}
          type="text"
          name="email"
          value={searchValue}
          onChange={e => {
            setSearchValue(e.target.value)

            debouncedSetSearchValue(e.target.value)
          }}
          autoFocus
          placeholder="Search"
          label="Search"
          InputProps={{
            endAdornment: <InputAdornment position="end" sx={{
              visibility: searchLoading ? undefined : 'hidden'
            }}>
              <CustomProgress
                size={25}
              />
            </InputAdornment>,
          }}
        />
        {

        }
      </Box>

      {
        !pokemonList ?
          <CustomProgress/> :
          <Box className={classNames(
            classes.list,
            {
              [classes.list_xs]: isXs,
              [classes.list_sm]: isSm,
              [classes.list_md]: isMd,
              [classes.list_lg]: upLg,
            }
          )}>
            {
              !pokemonList.results.length ?
                <Typography variant="h6">Nothing found</Typography> :
                pokemonList.results.map(item => (
                  <Box className={classes.list_item} key={item.id}>
                    <img
                      className={classes.list_item_image}
                      src={item.sprites.front_default}
                      alt="Pokemon View"
                    />
                    <Typography
                      variant="subtitle1"
                      align="center"
                      className={classes.list_item_name}
                    >{item.name}</Typography>
                  </Box>
                ))
            }
          </Box>
      }
    </>
  );
}
