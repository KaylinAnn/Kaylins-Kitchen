import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { logIn } from "../Ducks/Reducer";

class Dashboard extends Component {
  componentDidMount() {
    axios.get("api/user-data").then(res => {
      const user = res.data;
      this.props.logIn(user);
    });
  }

  render() {
    const user = this.props;
    console.log(user);

    return (
      <div>
        <h1>DASHBOARD</h1>
        <div>Name: {user.name}</div>
        <div>
          Email:
          {user.email}
        </div>
        <img src={user.picture} alt="user" />
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { user } = state;
  return user;
};

const mapDispatchToProps = {
  logIn
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
