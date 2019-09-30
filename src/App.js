import React, { Component } from "react";
import "./App.css";
import "./reset.css";
import Nav from "./components/Nav/Nav";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
          integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU"
          crossorigin="anonymous"
        />
        <Nav />
        {Routes}
      </div>
    );
  }
}

export default App;
