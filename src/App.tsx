import React, { ReactElement, useMemo } from 'react';
import Routes from "./routing/Routes";
import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { StyledEngineProvider, Theme } from '@mui/material/styles';
import { getGlobalStyles } from "utils/helpers/globalStyles";
import PageLayout from "components/layout/PageLayout/PageLayout";
import { getTheme } from "utils/configs/themeConfig";
import { FunctionInterpolation } from "@emotion/styled/dist/emotion-styled.cjs";

import './assets/scss/index.scss';

export default function App(): ReactElement {
  const theme = useMemo<Theme>(() => getTheme(), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme/>

      <GlobalStyles styles={(theme) => getGlobalStyles(theme) as FunctionInterpolation<Theme>}/>

      <StyledEngineProvider injectFirst>
        <PageLayout>
          <Routes/>
        </PageLayout>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}