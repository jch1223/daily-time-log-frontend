import React from "react";
import { Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import HomePage from "../pages/HomePage";
import MonthCalendarPage from "../pages/MonthCalendarPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/month-calendar">
          <MonthCalendarPage />
        </Route>
        <Route>404 NOT FOUND</Route>
      </Switch>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
