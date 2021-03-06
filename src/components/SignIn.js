import React, { Component } from "react";

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
        <h1 className="welcome">Kaylin's Kitchen</h1>
        <div className="loginBox">
          <h3 className="signInMessage">
            Sign up to start your personalized recipe search.
          </h3>
          <button className="loginButton" onClick={this.login}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default SignIn;
