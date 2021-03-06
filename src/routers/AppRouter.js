import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import GetMovies from "../components/GetMovies";
import Movie from "../components/Movie";

export default function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={GetMovies} />
        <Route exact path="/movie/:id/:average" component={Movie} />
      </Switch>
    </Router>
  );
}
