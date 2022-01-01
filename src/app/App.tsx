import React from "react";
import { Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";

import { darkTheme, lightTheme } from "../assets/styles/theme";
import { useAppSelector } from "./store";

import HomePage from "../pages/HomePage";

const queryClient = new QueryClient();

function App() {
  const themeMode = useAppSelector((state) => state.setting.themeMode);

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <QueryClientProvider client={queryClient}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route>404 NOT FOUND</Route>
        </Switch>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
