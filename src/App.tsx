import React, { FC, ReactElement, Suspense, useRef, lazy } from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import CharacterProvider from "./provider/character";
import SwapiService, { SwapiServiceController } from "./service/swapi";
import ComponentPreloader from "./components/ComponentPreloader";

const Main = lazy(() => import("./pages/Main"));
const Character = lazy(() => import("./pages/Character"));

const paths = {
  root: () => "/",
  character: () => `${paths.root()}:characterId`,
};

const App: FC = () => {
  const swapiService = useRef<SwapiServiceController>(
    SwapiService({ baseURL: process.env.REACT_APP_SWAPI_URL })
  );

  const mainElement: ReactElement = (
    <Suspense fallback={<ComponentPreloader />}>
      <Main />
    </Suspense>
  );
  const characterElement: ReactElement = (
    <Suspense fallback={<ComponentPreloader />}>
      <Character />
    </Suspense>
  );

  return (
    <>
      <CssBaseline />
      <IntlProvider locale="en">
        <CharacterProvider swapiService={swapiService.current}>
          <Container component="main" maxWidth="md" sx={{ height: "100%" }}>
            <Box
              component="article"
              sx={{ paddingTop: 4, paddingBottom: 4, height: "100%" }}
            >
              <BrowserRouter>
                <Routes>
                  <Route path={paths.character()} element={characterElement} />
                  <Route path={paths.root()} element={mainElement} />
                </Routes>
              </BrowserRouter>
            </Box>
          </Container>
        </CharacterProvider>
      </IntlProvider>
    </>
  );
};

export default App;
