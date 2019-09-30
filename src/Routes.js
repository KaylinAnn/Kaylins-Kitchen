import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Profile from "./components/Profile/Profile";
import Pantry from "./components/Pantry/Pantry";
import Recipe from "./components/Recipe/Recipe";
import SignIn from "./components/SignIn/SignIn";

export default (
  <Switch>
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/profile" component={Profile} />
    <Route path="/recipe/:id" component={Recipe} />
    <Route path="/pantry" component={Pantry} />
    <Route exact path="/" component={SignIn} />
  </Switch>
);
