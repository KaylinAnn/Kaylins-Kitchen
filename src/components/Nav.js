import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

export class Nav extends Component {
  render() {
    return (
      <div>
        <h1>Nav</h1>
        <Link to="/dashboard">
          <button>Home</button>
        </Link>
        <Link to="/profile">
          <button>Profile</button>
        </Link>
        <Link to="/">
          <button>LogOut</button>
        </Link>
        <Link to="/pantry">
          <button>Pantry</button>
        </Link>
      </div>
    );
  }
}

export default Nav;
