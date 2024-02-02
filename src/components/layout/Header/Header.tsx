import React, { ReactElement } from 'react';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import classes from './Header.module.scss'
import { Box, useMediaQuery, useTheme } from "@mui/material";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { defaultPublicPath } from "../../../routing/routes/publicRoutes";

export default function Header(): ReactElement {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <header className={classes.header_wrapper}>
      <Box className={classes.header}>
        <Box className={classNames(
          classes.header_content,
          {
            [classes.header_content_xs]: isXs,
          }
        )}>
          <Box className={classes.logo_wrapper}>
            <Link to={defaultPublicPath}>
              <Logo className={classes.logo}/>
            </Link>
          </Box>
        </Box>
      </Box>
    </header>
  )
}
