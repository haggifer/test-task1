import React, { ReactElement, useEffect } from 'react';
import Header from "../Header/Header";
import { Box } from "@mui/material";
import classes from './PageLayout.module.scss';
import { Outlet } from "react-router";
import { useLocation, useNavigate } from "react-router-dom";
import { defaultPublicPath } from "../../../routing/routes/publicRoutes";

export default function PageLayout(): ReactElement {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') {
      navigate(defaultPublicPath)
    }
  }, [location.pathname]);

  return (
    <>
      <Header/>

      <main className={classes.content_wrapper}>
        <Box className={classes.content}>
          <Outlet/>
        </Box>
      </main>
    </>
  );
}
