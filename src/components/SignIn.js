import React, { Component } from "react";
import Routes from "../Routes";

export class SignIn extends Component {
  login() {
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/auth/callback`
    );
    window.location = `https://${
      process.env.REACT_APP_AUTH0_DOMAIN
    }/authorize?client_id=${
      process.env.REACT_APP_AUTH0_CLIENT_ID
    }&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
  }

  render() {
    return (
      <div className="loginPage">
        <button onClick={this.login}>Login</button>
        <div>{Routes}</div>
      </div>
    );
  }
}

export default SignIn;
