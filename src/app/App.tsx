import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";

function App() {
  return (
    <Switch>
      <Route path="/">
        <HomePage />
      </Route>
      <Route>404 NOT FOUND</Route>
    </Switch>
  );
}

export default App;
