import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./reset.css";
import SignIn from "./components/SignIn";
import Nav from "./components/Nav";

class App extends Component {
  render() {
    return (
      <div className="App">
        <SignIn />
        <Nav />
      </div>
    );
  }
}

export default App;
