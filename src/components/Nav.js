import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { logOut } from "../Ducks/Reducer";

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

const mapStateToProps = state => {
  const { user } = state;
  return user;
};

const mapDispatchToProps = {
  logOut
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
