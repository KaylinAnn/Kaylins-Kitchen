import React, { Component } from "react";
import "./App.css";
import "./reset.css";
import Nav from "./components/Nav";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div className="App">

        <Nav />
        {Routes}
      </div>
    );
  }
}

export default App;
