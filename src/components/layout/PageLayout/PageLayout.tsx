import React, { ReactElement, ReactNode } from 'react';
import Header from "../Header/Header";
import { Box } from "@mui/material";
import classes from './PageLayout.module.scss';

interface IProps {
  children: ReactNode,
}

export default function PageLayout({ children }: IProps): ReactElement {
  return (
    <>
      <Header/>

      <Box className={classes.content_wrapper}>
        <Box className={classes.content}>
          {children}
        </Box>
      </Box>
    </>
  );
}
