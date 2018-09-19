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
        <div>
          {user ? (
            <div>
              <div className="user-image-container">
                <img src={user.picture} alt="User" />
              </div>

              <p>{user.name}</p>
            </div>
          ) : (
            <div>
              <p>Please login</p>
              <button onClick={this.login}>Login</button>
            </div>
          )}
        </div>
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
