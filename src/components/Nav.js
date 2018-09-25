import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { logIn, logOut } from "../Ducks/Reducer";

export class Nav extends Component {
  getUser() {
    axios.get("api/user-data").then(res => {
      const user = res.data;
      this.props.logIn(user);
    });
  }
  render() {
    const user = this.props;

    return (
      <div className="navbar">
        <div className="userName">Welcome, {user.name}!</div>
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
  logOut,
  logIn
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
