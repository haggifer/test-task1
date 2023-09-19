import React, { ReactElement } from 'react';
import Header from "../Header/Header";
import { Box } from "@mui/material";
import classes from './PageLayout.module.scss';
import { Outlet } from "react-router";

export default function PageLayout(): ReactElement {
  return (
    <>
      <Header/>

      <Box className={classes.content_wrapper}>
        <Box className={classes.content}>
          <Outlet/>
        </Box>
      </Box>
    </>
  );
}
