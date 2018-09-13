import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Pantry from "./components/Pantry";
import SignIn from "./components/SignIn";

export default (
  <Switch>
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/profile" component={Profile} />
    <Route path="/pantry" component={Pantry} />
    <Route exact path="/" component={SignIn} />
  </Switch>
);
