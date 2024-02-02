import React, { ReactElement, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  selectPokemonCurrent,
  selectPokemonError,
} from '../../../redux/selectors/pokemon';
import globalClasses from 'assets/scss/globalClasses.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getPokemon } from '../../../redux/features/pokemon/pokemonThunks';
import CustomProgress from '../../../components/common/CustomProgress/CustomProgress';
import classes from './PokemonDetails.module.scss';
import classNames from 'classnames';

export default function PokemonList(): ReactElement {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentPokemon = useAppSelector(selectPokemonCurrent);
  const pokemonError = useAppSelector(selectPokemonError);

  const theme = useTheme();
  const downLg = useMediaQuery(theme.breakpoints.down('lg'));

  useEffect(() => {
    dispatch(getPokemon(Number(params.id) as number));
  }, [params.id]);

  const backToList = () => {
    navigate('/pokemon');
  };

  return (
    <>
      <Box className={classes.header}>
        <Typography
          variant="h2"
          component="h1"
          className={globalClasses.page_title}
        >
          Pokemon details
        </Typography>

        <Button variant="outlined" onClick={backToList}>
          Back to list
        </Button>
      </Box>

      {pokemonError ? (
        <Typography variant="h5">Pokemon not found!</Typography>
      ) : !currentPokemon || currentPokemon.id !== Number(params.id) ? (
        <CustomProgress />
      ) : (
        <Box
          className={classNames(
            classes.container,
            downLg && classes.container_mobile,
          )}
        >
          <Box className={classes.images}>
            {(currentPokemon.sprites.other.dream_world.front_default ||
              currentPokemon.sprites.front_default) && (
              <>
                <Box className={classes.images_sm}>
                  {currentPokemon.sprites.front_default && (
                    <img
                      className={classes.image_sm}
                      src={currentPokemon.sprites.front_default}
                      alt="Front Default"
                    />
                  )}
                  {currentPokemon.sprites.back_default && (
                    <img
                      className={classes.image_sm}
                      src={currentPokemon.sprites.back_default}
                      alt="Back Default"
                    />
                  )}
                  {currentPokemon.sprites.front_shiny && (
                    <img
                      className={classes.image_sm}
                      src={currentPokemon.sprites.front_shiny}
                      alt="Front Shiny"
                    />
                  )}
                  {currentPokemon.sprites.back_shiny && (
                    <img
                      className={classes.image_sm}
                      src={currentPokemon.sprites.back_shiny}
                      alt="Back Shiny"
                    />
                  )}
                </Box>
                {
                  <img
                    className={classes.image_lg}
                    src={
                      currentPokemon.sprites.other.dream_world.front_default ||
                      currentPokemon.sprites.front_default
                    }
                    alt="Front Dream World"
                  />
                }
              </>
            )}
          </Box>
          <Box className={classes.data}>
            <Box className={classes.data_item}>
              <Box className={classes.data_item_description}>Name:</Box>
              <Box className={classes.data_item_content}>
                {currentPokemon.name}
              </Box>
            </Box>
            <Box className={classes.data_item}>
              <Box className={classes.data_item_description}>Height:</Box>
              <Box className={classes.data_item_content}>
                {currentPokemon.height}
              </Box>
            </Box>
            <Box className={classes.data_item}>
              <Box className={classes.data_item_description}>Weight:</Box>
              <Box className={classes.data_item_content}>
                {currentPokemon.weight}
              </Box>
            </Box>

            <Box className={classes.data_item}>
              <Box className={classes.data_item_description}>Moves:</Box>
              <Box className={classNames(classes.data_item_content)}>
                {currentPokemon.moves
                  .map((move) => move.move.name)
                  .sort()
                  .join(', ')}
              </Box>
            </Box>

            <Box className={classes.data_item}>
              <Box className={classes.data_item_description}>Stats:</Box>
              <Box
                className={classNames(
                  classes.data_item_content,
                  classes.data_item_list,
                )}
                component="ul"
              >
                {currentPokemon.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {`${stat.stat.name}: `} <strong>{stat.base_stat}</strong>
                  </li>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
