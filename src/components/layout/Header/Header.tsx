import React, { ReactElement } from 'react';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import classes from './Header.module.scss'
import { Box, useMediaQuery, useTheme } from "@mui/material";
import classNames from "classnames";

export default function Header(): ReactElement {
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <header className={classes.header_wrapper}>
      <Box className={classes.header}>
        <div className={classNames(
          classes.header_content,
          {
            [classes.header_content_xs]: isXs,
          }
        )}>
          <Box className={classes.logo_wrapper}>
            <Logo className={classes.logo}/>
          </Box>
        </div>
      </Box>
    </header>
  )
}
