import {
  Box,
  Pagination,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import globalClasses from 'assets/scss/globalClasses.module.scss';
import classNames from 'classnames';
import { useFormik } from 'formik';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDebounce } from 'usehooks-ts';
import * as yup from 'yup';
import {
  CommonSelect,
  defaultStringSelectOption,
  ISelectOption,
} from '../../../components/common/CommonSelect/CommonSelect';
import CustomProgress from '../../../components/common/CustomProgress/CustomProgress';
import ImageFallback from '../../../components/common/ImageFallback/ImageFallback';
import {
  defaultListLength,
  getPokemonList,
} from '../../../redux/features/pokemon/pokemonThunks';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import {
  selectPokemonList,
  selectPokemonTypes,
} from '../../../redux/selectors/pokemon';
import { IPokemonListParams } from '../../../typescript/entities';
import { getURLParamsObject } from '../../../utils/helpers/common';
import { generatePerPageOptions } from '../../../utils/helpers/common';
import classes from './PokemonList.module.scss';

// Each key is associated with URL parameter
interface IFiltersValues {
  search: string;
  type: ISelectOption<string>;
  limit: ISelectOption<number>;
}

const defaultURLParamsObject: IPokemonListParams = {
  limit: defaultListLength,
  offset: 0,
};

export default function PokemonList(): ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const pokemonList = useAppSelector(selectPokemonList);
  const pokemonTypes = useAppSelector(selectPokemonTypes);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));
  const upLg = useMediaQuery(theme.breakpoints.up('lg'));

  const [lastURLParamsObject, setLastURLParamsObject] =
    useState<IPokemonListParams>(defaultURLParamsObject);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [perPageOptions] = useState<ISelectOption<number>[]>(
    generatePerPageOptions([12, 24, 48]),
  );

  const [offset, setOffset] = useState<number>(0);

  const [initFiltersValues] = useState<IFiltersValues>({
    search: '',
    type: defaultStringSelectOption,
    limit: perPageOptions[0],
  });

  const typeOptions = useMemo(() => {
    if (!pokemonTypes) {
      return [defaultStringSelectOption];
    }

    return [
      defaultStringSelectOption,
      ...pokemonTypes.map((type) => ({
        label: type.name,
        value: type.name,
      })),
    ];
  }, [pokemonTypes]);

  const [validationSchema] = useState(yup.object({}));

  const { values, handleChange, setFieldValue, setValues } = useFormik({
    validationSchema: validationSchema,
    onSubmit: () => {},
    initialValues: initFiltersValues,
    enableReinitialize: true,
  });

  const debouncedSearchValue = useDebounce<string>(values.search, 400);

  useEffect(() => {
    if (
      location.search.includes('limit') &&
      location.search.includes('offset')
    ) {
      handleURLParamsChange();
    } else {
      updateUrlParams();

      setOffset(0);
      setValues(initFiltersValues);
    }
  }, [location.search]);

  useEffect(() => {
    updateUrlParams();
  }, [offset, debouncedSearchValue, values.type, values.limit]);

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setOffset(values.limit.value * (value - 1));
  };

  const handleURLParamsChange = async () => {
    const URLParamsObject = getURLParamsObject(location.search);

    setIsLoading(true);

    await dispatch(getPokemonList(URLParamsObject));

    setIsLoading(false);

    setLastURLParamsObject(URLParamsObject);
  };

  const updateUrlParams = () => {
    const { type, limit } = values;

    const resetOffset: boolean =
      lastURLParamsObject.search !== (debouncedSearchValue || undefined) ||
      lastURLParamsObject.type !== (type.value || undefined) ||
      lastURLParamsObject.limit !== (limit.value || undefined);

    const newParams: IPokemonListParams = {
      offset: resetOffset ? 0 : offset,
      search: debouncedSearchValue,
      type: type.value,
      limit: limit.value,
    };

    const newSearchParams = new URLSearchParams(location.search);

    Object.entries(newParams).forEach((entry) => {
      if (!entry[1] && entry[0] !== 'offset') {
        newSearchParams.delete(entry[0]);
      } else {
        newSearchParams.set(entry[0], String(entry[1]));
      }
    });

    navigate({
      pathname: location.pathname,
      search: newSearchParams.toString(),
    });

    if (resetOffset) {
      setOffset(0);
    }
  };

  return (
    <>
      <Typography
        variant="h2"
        component="h1"
        className={globalClasses.page_title}
      >
        Pokemon list
      </Typography>

      <Box className={classes.filters}>
        <TextField
          className={classes.search}
          type="text"
          name="search"
          value={values.search}
          onChange={handleChange}
          autoFocus
          placeholder="Search"
          label="Search"
        />
        <CommonSelect<string, false>
          name="type"
          value={values.type}
          onChange={(newValue) => setFieldValue('type', newValue)}
          options={typeOptions}
          styles={{
            control: {
              minHeight: '56px',
            },
            singleValue: {
              textTransform: 'capitalize',
            },
            option: {
              textTransform: 'capitalize',
            },
          }}
        />

        {pokemonList && isLoading && (
          <CustomProgress className={classes.progress} size={30} />
        )}
      </Box>

      {!pokemonList ? (
        <CustomProgress />
      ) : (
        <>
          <Box
            className={classNames(classes.list, {
              [classes.list_xs]: isXs,
              [classes.list_sm]: isSm,
              [classes.list_md]: isMd,
              [classes.list_lg]: upLg,
            })}
          >
            {!pokemonList.results.length ? (
              <Typography variant="h6">Nothing found</Typography>
            ) : (
              pokemonList.results.map((item) => (
                <Box
                  component={Link}
                  to={`/pokemon/${item.id}`}
                  className={classes.list_item}
                  key={item.id}
                >
                  {!item.sprites.front_default ? (
                    <ImageFallback
                      className={classes.list_item_image_fallback}
                    />
                  ) : (
                    <img
                      className={classes.list_item_image}
                      src={item.sprites.front_default}
                      alt="Pokemon View"
                    />
                  )}

                  <Typography
                    variant="subtitle1"
                    align="center"
                    className={classes.list_item_name}
                  >
                    {item.name}
                  </Typography>
                </Box>
              ))
            )}
          </Box>

          <Box className={classes.list_pagination}>
            <CommonSelect<number, false>
              name="limit"
              value={values.limit}
              onChange={(newValue) => setFieldValue('limit', newValue)}
              options={perPageOptions}
              styles={{
                control: {
                  minHeight: '40px',
                },
              }}
            />

            <Pagination
              count={Math.ceil(pokemonList.count / values.limit.value)}
              page={
                offset
                  ? Math.round(offset / values.limit.value + 1)
                  : offset + 1
              }
              onChange={handlePaginationChange}
              variant="outlined"
              shape="rounded"
              color="primary"
              size="large"
              showFirstButton={true}
              showLastButton={true}
            />
          </Box>
        </>
      )}
    </>
  );
}
