import React from "react";
import { Route, Switch } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import HomePage from "../pages/HomePage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
        <Route>404 NOT FOUND</Route>
      </Switch>
    </QueryClientProvider>
  );
}

export default App;
